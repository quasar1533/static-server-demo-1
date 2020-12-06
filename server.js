var http = require("http");
var fs = require("fs");
var url = require("url");
const { report } = require("process");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method; //请求方法

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个人发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  response.status = 200;
  const filePath = path === "/" ? "/index.html" : path;
  const suffix = filePath.substring(filePath.lastIndexOf("."));
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/Javascript",
    ".jpg": "image/jpeg",
    ".png": "image/png",
  };
  response.setHeader(
    "Content-Type",
    `${fileTypes[suffix] || text / html}; charset=utf-8`
  );
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = "您访问的文件不存在";
    response.status = 404;
  }
  response.write(content);
  response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n请打开网址 http://localhost:" + port);
