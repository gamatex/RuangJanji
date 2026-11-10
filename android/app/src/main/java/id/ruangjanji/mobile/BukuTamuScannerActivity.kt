package id.ruangjanji.mobile

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.media.AudioManager
import android.media.ToneGenerator
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import java.util.concurrent.Executors

class BukuTamuScannerActivity : AppCompatActivity() {

    private lateinit var previewView: PreviewView
    private lateinit var tvGuestName: TextView
    private lateinit var tvGuestBadge: TextView
    private lateinit var tvGuestDetail: TextView
    private lateinit var actionButtonsLayout: LinearLayout
    private lateinit var btnCheckInAction: Button
    private lateinit var btnSouvenirAction: Button
    private lateinit var btnNextScan: Button
    private lateinit var btnTorch: ImageButton
    private lateinit var btnBack: ImageButton

    private lateinit var tvStatHadir: TextView
    private lateinit var tvStatBelum: TextView
    private lateinit var tvStatSouvenir: TextView

    private val cameraExecutor = Executors.newSingleThreadExecutor()
    private var cameraControl: CameraControl? = null
    private var isTorchOn = false
    private var isScanningActive = true
    private var currentGuestId: String = ""

    // In-memory counter for live display
    private var countHadir = 0
    private var countBelum = 0
    private var countSouvenir = 0

    private val toneGenerator = ToneGenerator(AudioManager.STREAM_NOTIFICATION, 100)
    private val vibrator by lazy { getSystemService(Context.VIBRATOR_SERVICE) as Vibrator }

    private val cameraPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) {
            startCamera()
        } else {
            Toast.makeText(this, "Izin kamera diperlukan untuk memindai kartu QR tamu", Toast.LENGTH_LONG).show()
            finish()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_buku_tamu_scanner)

        initViews()
        setupListeners()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            startCamera()
        } else {
            cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
        }
    }

    private fun initViews() {
        previewView = findViewById(R.id.previewView)
        tvGuestName = findViewById(R.id.tvGuestName)
        tvGuestBadge = findViewById(R.id.tvGuestBadge)
        tvGuestDetail = findViewById(R.id.tvGuestDetail)
        actionButtonsLayout = findViewById(R.id.actionButtonsLayout)
        btnCheckInAction = findViewById(R.id.btnCheckInAction)
        btnSouvenirAction = findViewById(R.id.btnSouvenirAction)
        btnNextScan = findViewById(R.id.btnNextScan)
        btnTorch = findViewById(R.id.btnTorch)
        btnBack = findViewById(R.id.btnBack)

        tvStatHadir = findViewById(R.id.tvStatHadir)
        tvStatBelum = findViewById(R.id.tvStatBelum)
        tvStatSouvenir = findViewById(R.id.tvStatSouvenir)

        updateStats()
    }

    private fun setupListeners() {
        btnBack.setOnClickListener { finish() }

        btnTorch.setOnClickListener {
            isTorchOn = !isTorchOn
            cameraControl?.enableTorch(isTorchOn)
            btnTorch.alpha = if (isTorchOn) 1.0f else 0.6f
        }

        btnCheckInAction.setOnClickListener {
            onCheckInConfirmed()
        }

        btnSouvenirAction.setOnClickListener {
            onSouvenirRecorded()
        }

        btnNextScan.setOnClickListener {
            resetScannerForNextGuest()
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder().build().also {
                it.setSurfaceProvider(previewView.surfaceProvider)
            }

            val barcodeScanner = BarcodeScanning.getClient()
            val imageAnalyzer = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build().also {
                    it.setAnalyzer(cameraExecutor) { imageProxy ->
                        processImageProxy(barcodeScanner, imageProxy)
                    }
                }

            try {
                cameraProvider.unbindAll()
                val camera = cameraProvider.bindToLifecycle(
                    this,
                    CameraSelector.DEFAULT_BACK_CAMERA,
                    preview,
                    imageAnalyzer
                )
                cameraControl = camera.cameraControl
            } catch (e: Exception) {
                Toast.makeText(this, "Gagal membuka kamera: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }, ContextCompat.getMainExecutor(this))
    }

    @androidx.annotation.OptIn(ExperimentalGetImage::class)
    private fun processImageProxy(scanner: com.google.mlkit.vision.barcode.BarcodeScanner, imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage != null && isScanningActive) {
            val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)
            scanner.process(image)
                .addOnSuccessListener { barcodes ->
                    for (barcode in barcodes) {
                        val rawValue = barcode.rawValue ?: continue
                        handleBarcodeDetected(rawValue)
                        break
                    }
                }
                .addOnCompleteListener {
                    imageProxy.close()
                }
        } else {
            imageProxy.close()
        }
    }

    private fun handleBarcodeDetected(rawValue: String) {
        if (!isScanningActive) return
        isScanningActive = false

        // Ekstraksi guest ID
        currentGuestId = if (rawValue.contains("guest=")) {
            rawValue.substringAfter("guest=").substringBefore("&")
        } else if (rawValue.contains("/k/")) {
            rawValue.substringAfter("/k/").trim()
        } else {
            rawValue.trim()
        }

        // Haptic & Audio Feedback
        triggerFeedback()

        runOnUiThread {
            displayGuestInfo(currentGuestId)
        }
    }

    @SuppressLint("SetTextI18n")
    private fun displayGuestInfo(guestId: String) {
        val displayName = if (guestId.length > 8) "Tamu: " + guestId.take(8).uppercase() else "Tamu: $guestId"
        tvGuestName.text = displayName
        tvGuestBadge.visibility = View.VISIBLE
        tvGuestBadge.text = "VIP"

        tvGuestDetail.text = "Kuota: 2 Orang · Belum Check-in"
        actionButtonsLayout.visibility = View.VISIBLE
        btnNextScan.visibility = View.VISIBLE
        btnCheckInAction.isEnabled = true
        btnCheckInAction.text = "Check-in Hadir"
        btnSouvenirAction.isEnabled = true
        btnSouvenirAction.text = "Beri Souvenir"
    }

    @SuppressLint("SetTextI18n")
    private fun onCheckInConfirmed() {
        countHadir++
        updateStats()

        btnCheckInAction.isEnabled = false
        btnCheckInAction.text = "✅ Sudah Hadir"
        tvGuestDetail.text = "Tamu telah dikonfirmasi hadir (2 Orang)"

        val returnIntent = Intent().apply {
            putExtra("SCANNED_GUEST_ID", currentGuestId)
            putExtra("ACTION", "CHECKIN")
        }
        setResult(Activity.RESULT_OK, returnIntent)

        Toast.makeText(this, "Check-in Berhasil!", Toast.LENGTH_SHORT).show()
    }

    @SuppressLint("SetTextI18n")
    private fun onSouvenirRecorded() {
        countSouvenir++
        updateStats()

        btnSouvenirAction.isEnabled = false
        btnSouvenirAction.text = "🎁 Souvenir Diserahkan"
        Toast.makeText(this, "Souvenir berhasil dicatat!", Toast.LENGTH_SHORT).show()
    }

    private fun resetScannerForNextGuest() {
        isScanningActive = true
        currentGuestId = ""
        tvGuestName.text = "Arahkan Kamera ke QR Tamu"
        tvGuestBadge.visibility = View.GONE
        tvGuestDetail.text = "Kamera siap memindai kartu kehadiran berikutnya"
        actionButtonsLayout.visibility = View.GONE
        btnNextScan.visibility = View.GONE
    }

    @SuppressLint("SetTextI18n")
    private fun updateStats() {
        tvStatHadir.text = "Hadir: $countHadir"
        tvStatBelum.text = "Belum: $countBelum"
        tvStatSouvenir.text = "Souvenir: $countSouvenir"
    }

    private fun triggerFeedback() {
        toneGenerator.startTone(ToneGenerator.TONE_PROP_BEEP, 120)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(100, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            @Suppress("DEPRECATION")
            vibrator.vibrate(100)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        toneGenerator.release()
    }
}
