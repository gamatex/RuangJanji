package id.ruangjanji.mobile

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.webkit.*
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    private lateinit var web: WebView
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null

    private val filePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val uris = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        fileUploadCallback?.onReceiveValue(uris)
        fileUploadCallback = null
    }

    private val qrScannerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val guestId = result.data?.getStringExtra("SCANNED_GUEST_ID") ?: ""
            if (guestId.isNotEmpty()) {
                // Berikan data ke javascript di apps/buku-tamu
                val js = "javascript:if(window.onNativeQrScanned){ window.onNativeQrScanned('$guestId'); }"
                web.evaluateJavascript(js, null)
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        web = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.databaseEnabled = true
            settings.mediaPlaybackRequiresUserGesture = false
            settings.allowFileAccess = false
            settings.setSupportMultipleWindows(false)

            // Tambahkan Javascript Bridge
            addJavascriptInterface(RuangJanjiNativeBridge(this@MainActivity), "AndroidNative")

            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                    val uri = request?.url ?: return false
                    val host = uri.host ?: ""

                    // Buka link WhatsApp resmi di aplikasi WA
                    if (host.contains("whatsapp.com") || host.contains("wa.me")) {
                        try {
                            startActivity(Intent(Intent.ACTION_VIEW, uri))
                        } catch (e: Exception) {
                            Toast.makeText(this@MainActivity, "WhatsApp tidak ditemukan", Toast.LENGTH_SHORT).show()
                        }
                        return true
                    }

                    // Izinkan domain internal
                    if ("ruangjanji.dhjougkyha.workers.dev" == host || "bfaarhffvylqqbxycuds.supabase.co" == host) {
                        return false
                    }

                    // Tautan eksternal lain dibuka di browser sistem
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, uri))
                    } catch (e: Exception) {
                        Toast.makeText(this@MainActivity, "Tautan tidak dapat dibuka", Toast.LENGTH_SHORT).show()
                    }
                    return true
                }
            }

            webChromeClient = object : WebChromeClient() {
                override fun onShowFileChooser(
                    webView: WebView?,
                    filePathCallback: ValueCallback<Array<Uri>>?,
                    fileChooserParams: FileChooserParams?
                ): Boolean {
                    fileUploadCallback?.onReceiveValue(null)
                    fileUploadCallback = filePathCallback

                    return try {
                        val intent = fileChooserParams?.createIntent()
                        if (intent != null) {
                            filePickerLauncher.launch(intent)
                            true
                        } else {
                            false
                        }
                    } catch (e: Exception) {
                        fileUploadCallback = null
                        false
                    }
                }
            }

            setDownloadListener { url, _, _, _, _ ->
                try {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                } catch (e: Exception) {
                    Toast.makeText(this@MainActivity, "Gagal mengunduh file", Toast.LENGTH_SHORT).show()
                }
            }
        }

        setContentView(web)
        web.loadUrl(BuildConfig.APP_URL)
    }

    inner class RuangJanjiNativeBridge(private val context: Context) {
        @JavascriptInterface
        fun isNative(): Boolean = true

        @JavascriptInterface
        fun launchCameraScanner(eventId: String) {
            runOnUiThread {
                val intent = Intent(this@MainActivity, BukuTamuScannerActivity::class.java).apply {
                    putExtra("EXTRA_EVENT_ID", eventId)
                }
                qrScannerLauncher.launch(intent)
            }
        }

        @JavascriptInterface
        fun sendWhatsApp(phone: String, text: String) {
            val url = "https://api.whatsapp.com/send?phone=${Uri.encode(phone)}&text=${Uri.encode(text)}"
            try {
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
            } catch (e: Exception) {
                Toast.makeText(context, "WhatsApp tidak tersedia", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onBackPressed() {
        if (web.canGoBack()) {
            web.goBack()
        } else {
            super.onBackPressed()
        }
    }

    override fun onDestroy() {
        web.destroy()
        super.onDestroy()
    }
}
