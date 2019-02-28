//1.何时才能拦截最后生成的swig
//2.如何分清这个swig文件对应的JS和CSS
const pluginName = 'HtmlAfterWebpackPlugin';
const assetsHelp = (data) => {
    let js = [];
    let css = [];
    const dir = {
        js: item => `<script src="${item}"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for (let jsitem of data.js) {
        js.push(dir.js(jsitem));
    }
    for (let cssitem of data.css) {
        css.push(dir.css(cssitem));
    }
    return {
        js,
        css
    }
}
class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                // console.log('🍎htmlWebpackPluginAfterHtmlProcessing!!!');
                // console.log('🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌');
                let _html = htmlPluginData.html;
                const result = assetsHelp(htmlPluginData.assets);
                _html = _html.replace(/pages:/g, "../../");
                _html = _html.replace(/components:/g, "../../../components/");
                _html = _html.replace("<!--injectjs-->", result.js.join(""));
                _html = _html.replace("<!--injectcss-->", result.css.join(""));
                htmlPluginData.html = _html;
            });
        });
    }
}
module.exports = HtmlAfterWebpackPlugin;