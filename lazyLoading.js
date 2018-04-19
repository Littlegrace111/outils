function lazyLoading() {
   var imgList = []; // 保存所有图片节点的数组
   var delay; // 保存的是setTimeout生成的引用
   var time = 250; // 控制节流函数延迟执行的时间
   var offset = 0; //设置图片距离可视区域多远则立即加载的偏差值
}

//监听scroll事件，执行节流函数
lazyLoading.prototype.imgLoad = function(selector) {
    let _selector = selector || '.imgLazyLoad';
    this.imgList = [].slice.call(document.querySelectorAll(_selector)); //深拷贝：把NodeList转换成Array格式，google推荐写法
    //this.imgList = Array.apply(this, document.querySelectorAll(_selector));
    window.addEventListener('scroll', this._delay, false); 
}

lazyLoading.prototype._delay = function() {
    clearTimeout(this.delay);
    this.delay = setTimeout( () => {
        this._loadImg();
    }, this.time);
}

lazyLoading.prototype._loadImg = function() {
    this.imgList.forEach( (item) => {
        if(this._isShow(item)) {
            item.src = item.getAttribute('data-src');
        }
    });
}

lazyLoading.prototype.isShow = function(el) {
    let coords = el.getBoundingClientRect(); 
    console.log("coords.left=" + coords.left + 
                ", coords.top=" + coords.top + 
                ", coords.right=" + coords.right + 
                ", coords.bottom=" + coords.bottom); 
    let clientHeight = (document.documentElement.clientHeight || window.innerHeight) + parseInt(offset); 
    if(coords.top <= clientHeight) 
        return true;
    else 
        return false;
}

module.exports = lazyLoading;