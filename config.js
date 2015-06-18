var config = {
    sourceFolder: './src',
    distributionFolder: './dist',
    fileSuffix: '.min',
    demoAppFolder: './demoApp',
    cssDemoAppFolder: function(){
        return this.demoAppFolder + '/css'
    },
    jsDemoAppFolder: function(){
        return this.demoAppFolder + '/js'
    },
    cssSourceFiles: function(){
        return [this.sourceFolder + '/jquery.growl.css', this.sourceFolder + '/jquery.loading.css', this.sourceFolder + '/loaders.css', this.sourceFolder + '/jquery.ajaxui.css'];
    },
    jsSourceFiles: function(){
        return [this.sourceFolder + '/jquery.growl.js', this.sourceFolder + '/jquery.loading.js', this.sourceFolder + '/loaders.css.js', this.sourceFolder + '/jquery.ajaxui.js'];
    },
    cssLibFile: 'ajaxui.css',
    jsLibFile: 'ajaxui.js'
};

module.exports = config;