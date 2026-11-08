package id.ruangjanji.mobile;
import android.Manifest;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.*;
import android.content.*;
import android.net.Uri;
import android.content.pm.PackageManager;
import android.os.Build;
import android.view.View;
import android.widget.Toast;
public class MainActivity extends Activity {
 WebView web;
 ValueCallback<Uri[]> upload;
 PermissionRequest cameraRequest;
 static final int FILE_REQUEST=101, CAMERA_REQUEST=102;
 @Override public void onCreate(Bundle b){super.onCreate(b);
 web=new WebView(this);setContentView(web);
 web.getSettings().setJavaScriptEnabled(true);
 web.getSettings().setDomStorageEnabled(true);
 web.getSettings().setMediaPlaybackRequiresUserGesture(false);
 web.getSettings().setSupportMultipleWindows(false);
 web.setWebViewClient(new WebViewClient(){
 @Override public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest req){
 Uri u=req.getUrl();String host=u.getHost();
 if("https".equals(u.getScheme()) && ("ruangjanji.dhjougkyha.workers.dev".equals(host)||"bfaarhffvylqqbxycuds.supabase.co".equals(host)))return false;
 try{startActivity(new Intent(Intent.ACTION_VIEW,u));}catch(Exception e){Toast.makeText(MainActivity.this,"Tautan tidak tersedia",Toast.LENGTH_SHORT).show();}
 return true;
 }
 });
 web.setWebChromeClient(new WebChromeClient(){
 @Override public boolean onShowFileChooser(WebView w,ValueCallback<Uri[]> cb,FileChooserParams p){
 if(upload!=null)upload.onReceiveValue(null);upload=cb;
 try{startActivityForResult(p.createIntent(),FILE_REQUEST);return true;}catch(Exception e){upload=null;return false;}
 }
 @Override public void onPermissionRequest(PermissionRequest req){
 runOnUiThread(()->{
 if(!req.getOrigin().toString().startsWith("https://ruangjanji.dhjougkyha.workers.dev/")){req.deny();return;}
 boolean video=false;for(String r:req.getResources())if(PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(r))video=true;
 if(!video){req.deny();return;}
 cameraRequest=req;
 if(Build.VERSION.SDK_INT>=23&&checkSelfPermission(Manifest.permission.CAMERA)!=PackageManager.PERMISSION_GRANTED)requestPermissions(new String[]{Manifest.permission.CAMERA},CAMERA_REQUEST);
 else req.grant(new String[]{PermissionRequest.RESOURCE_VIDEO_CAPTURE});
 });
 }
 });
 web.setDownloadListener((url,userAgent,disposition,mime,length)->{
 try{startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url)));}catch(Exception e){Toast.makeText(this,"Unduhan perlu dibuka di browser",Toast.LENGTH_LONG).show();}
 });
 web.loadUrl(BuildConfig.APP_URL);
 }
 @Override public void onRequestPermissionsResult(int req,String[] perms,int[] results){super.onRequestPermissionsResult(req,perms,results);
 if(req==CAMERA_REQUEST&&cameraRequest!=null){if(results.length>0&&results[0]==PackageManager.PERMISSION_GRANTED)cameraRequest.grant(new String[]{PermissionRequest.RESOURCE_VIDEO_CAPTURE});else cameraRequest.deny();cameraRequest=null;}
 }
 @Override protected void onActivityResult(int request,int result,Intent data){super.onActivityResult(request,result,data);
 if(request==FILE_REQUEST&&upload!=null){upload.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result,data));upload=null;}
 }
 @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
 @Override protected void onDestroy(){web.destroy();super.onDestroy();}
}
