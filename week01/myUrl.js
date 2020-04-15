// let urlStr = "http://www.master8.net:80/seo/?ver=1.0&id=6#imhere";
let urlStr = "http://www.akmsg.com/WebDemo/URLParsing.html#top?username=admin&pwd=123456";

let href = "herf";
let protocol = "protocol";
let host = "host";
let port = "port";
let pathname = "pathname";
let search = "search";
let hash = "hash";
let qData = "qData";

function parseUrl(urlStr) {
    let newUrl = {};
    let sep1 = "://";
    let sep2 = ":";
    let sep3 = "?";
    let sep4 = "#";
    let sep5 = "/";
    let sep6 = "=";
    let sep7 = "&";

    newUrl[href] = urlStr;
    let restUrl = "";

    if (urlStr.indexOf(sep4) > urlStr.indexOf(sep3)) {
        if (urlStr.indexOf(sep4) != -1) {
            // 有#
            newUrl[hash] = sep4 + urlStr.split(sep4)[1];
            restUrl = urlStr.split(sep4)[0];
        } else {
            newUrl[hash] = "";
            restUrl = urlStr;
        }
    
        if (restUrl.indexOf(sep3) != -1) {
            // 有?
            let data = restUrl.split(sep3)[1]
            let obj = {};
            data.split(sep7).map(item => {
                return item.split(sep6);
            }).forEach(item => {
                obj[item[0]] = item[1];
            });
            newUrl[qData] = obj;
    
            newUrl[search] = sep3 + data;
            restUrl = restUrl.split(sep3)[0];
        } else {
            newUrl[qData] = {};
            newUrl[search] = "";
        }
    } else {
        if (urlStr.indexOf(sep3) != -1) {
            // 有?
            let data = urlStr.split(sep3)[1]
            let obj = {};
            data.split(sep7).map(item => {
                return item.split(sep6);
            }).forEach(item => {
                obj[item[0]] = item[1];
            });
            newUrl[qData] = obj;
    
            newUrl[search] = sep3 + data;
            restUrl = urlStr.split(sep3)[0];
        } else {
            newUrl[qData] = {};
            newUrl[search] = "";
            restUrl = urlStr
        }

        if (restUrl.indexOf(sep4) != -1) {
            // 有#
            newUrl[hash] = sep4 + restUrl.split(sep4)[1];
            restUrl = restUrl.split(sep4)[0];
        } else {
            newUrl[hash] = "";
        }
    }

    

    if (restUrl.indexOf(sep1) != -1) {
        // 有://
        let splited = restUrl.split(sep1);
        newUrl[protocol] = splited[0] + sep2;
        restUrl = splited[1];
    } else {
        newUrl[protocol] = "";
    }

    if (restUrl.indexOf(sep5) != -1) {
        // 有/
        let splited = restUrl.split(sep5);
        let path = "";
        for(let index in splited) {
            if (index == 0) {
                continue;
            }
            path += sep5 + splited[index];
        }
        newUrl[pathname] = path;
        restUrl = splited[0];
    } else {
        newUrl[pathname] = "";
    }

    if (restUrl.indexOf(sep2) != -1) {
        // 有:
        newUrl[port] = restUrl.split(sep2)[1];
        newUrl[host] = restUrl.split(sep2)[0];
    } else {
        newUrl[port] = "";
        newUrl[host] = restUrl;
    }
    return newUrl;
}

var myUrl = parseUrl(urlStr);
console.log(myUrl.herf, myUrl.protocol, myUrl.host, myUrl.port, myUrl.pathname, myUrl.search, myUrl.qData, myUrl.hash);