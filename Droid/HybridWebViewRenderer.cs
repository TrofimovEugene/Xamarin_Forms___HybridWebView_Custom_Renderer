using Android.Content;
using Android.Content.PM;
using CustomRenderer;
using CustomRenderer.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
using WebView = Xamarin.Forms.WebView;

[assembly: ExportRenderer(typeof(HybridWebView), typeof(HybridWebViewRenderer))]
namespace CustomRenderer.Droid
{
    public class HybridWebViewRenderer : WebViewRenderer
    {
        private Context _context;

        public HybridWebViewRenderer(Context context) : base(context)
        {
            _context = context;
        }

        protected override void OnElementChanged(ElementChangedEventArgs<WebView> e)
        {
            base.OnElementChanged(e);

            if (e.NewElement != null)
            {
                if (Control.Settings != null)
                {
                    Control.Settings.JavaScriptEnabled = true;
                    Control.Settings.AllowUniversalAccessFromFileURLs = true;
                    Control.Settings.DomStorageEnabled = true;
                    System.Diagnostics.Debug.WriteLine($"UserAgentString: {Control.Settings.UserAgentString}");
                }
                Control.SetWebChromeClient(new FormsWebChromeClient());
                Control.LoadUrl($"file:///android_asset/Content/{((HybridWebView)Element).Uri}");
                var pi = _context.PackageManager?.GetPackageInfo("com.google.android.webview", PackageInfoFlags.Activities);
                if (pi == null) 
                    return;
                System.Diagnostics.Debug.WriteLine($"Version name: {pi.VersionName}");
                System.Diagnostics.Debug.WriteLine($"Version code: {pi.VersionCode}");
            }
        }
    }
}
