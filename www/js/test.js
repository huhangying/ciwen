!function () {
    function a(a) {
        a = a || window.location.toString();
        var d, b = c("vid", a);
        return b || (d = a.match(/\/\w{15}\/(\w+)\.html/)) && (b = d[1]), b || ((d = a.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/)) ? b = d[1] : (d = a.match(/\/(page|play)\/+(\w{11})\.html/)) && (b = d[2])), b || (d = a.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/)) && (b = d[1]), encodeURIComponent(b)
    }
    function b() {
        var a = "", b = window.location.toString();
        return /\/cover\/\S\/(\S{15})/.test(b) ? a = RegExp.$1 : /\/prev\/\S\/(\S{15})/.test(b) ? a = RegExp.$1 : /\/detail\/\S\/(\S{15})\.html/.test(b) && (a = RegExp.$1), encodeURIComponent(a)
    }
    function c(a, b) {
        var c, d;
        return b = b || document.location.toString(), c = new RegExp("[?&#]" + a + "=([^&#]+)", "i"), d = c.exec(b), d && d.length > 1 ? d[1] : ""
    } function d() {
        var a = c("ptag") || c("PTAG"), b = "v.play.adaptor";
        return a ? a += "#{defaulTag}#1" : a = /https?:\/\/(.+?)(\/|$)/.test(document.referrer) ? RegExp.$1 + "#{defaulTag}#2" : "v_qq_com#{defaulTag}#3", -1 != location.href.indexOf("/detail/") && (b = "v.detail.adaptor"), encodeURIComponent(a.replace("{defaulTag}", b))
    } function e(a) {
        var e, f, b = location.search || "", c = [], d = [];
        if (b.length > 0)
        for (b = b.substr(1), d = b.split("&"), e = 0, f = d.length; f > e; e++) /^ptag= /i.test(d[e])||/ ^vid=/i.test(d[e])||c.push(d[e]);return c.length>0&&(a=a+(-1==a.indexOf("?")?"?":"&")+c.join("&")),a}var g,h,i,j,k;try{window!=top&&document.referrer&&-1!=document.referrer.indexOf("v.baidu.com")&&(top.location.href=self.location.href)}catch(f){};var istablet = /android/i.test(navigator.userAgent) && !/mobile/i.test(navigator.userAgent); if (!istablet && !/ipad/i.test(navigator.userAgent) && /(android)|(iphone)|(ipod)|(mqqbrowser)/i.test(navigator.userAgent) && !/MI PAD/.test(navigator.userAgent) && ("string" != typeof document.referrer || -1 == document.referrer.indexOf("m.v.qq.com/")))
            try {
                if (g = a(), h = b(), i = d(), j = "http://m.v.qq.com/", 15 == h.length)
                    j += "cover/" + h.charAt(0) + "/" + h + ".html", g && (j += "?vid=" + g);
                else {
                    if (11 != g.length) return;
                    j += "page/" + [g.charAt(0), g.charAt(9), g.charAt(10), g].join("/") + ".html"
                } j += (-1 == j.indexOf("?") ? "?" : "&") + "ptag=" + i, document.referrer && (j += "&mreferrer=" + encodeURIComponent(document.referrer)), location.replace(e(j))
        }
        catch (f) {
        } /\/cover|gplay|page\//.test(window.location.href)&&(k=new Image,k.src="http://rcgi.video.qq.com/web_report?cmd=3514&idx=1&refer="+encodeURIComponent(document.referrer)+"&_="+ +new Date)}();
