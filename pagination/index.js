  
  /**
   * 分页器组件
   * @param {Number} total -分页总数
   * @param {Number} cur   - 当前页
   * @param {Number} around - 中间页左右相邻个数
   * @returns {Array} 
   */
    function getPage(total,cur,around){
        let baseCount = 2*around+2+2+2+1 // 总共的元素个数
        let startPosition = 1+2+around+1 // 前面出现省略号 临界点
        let endPosition = total - 1 -2 -around // 后面出现省略号 临界点
        let surplus = baseCount - 4 // 当只出现一个省略号元素时 剩余的元素个数
        //总数少于全部展示的元素时全部展示
        if(total <= baseCount - 2){ 
          return Array.from({length:total},(el,inx)=>{
            return inx+1
          }) //否则出现省略号,省略号分三种情况
        }else{
          if(cur < startPosition){ //当前位置小于前省略号临界点,那么后面出现省略号
            return [...Array.from({length:surplus},(el,inx)=> inx+1),'...',total]
          }else if(cur > endPosition){ //相反同上
            return [1,'...',...Array.from({length:surplus},(el,inx)=>total-surplus +inx+1)]
          }else{ //前后同时出现省略号
            return [1,'....',Array.from({length:around*2+1},(el,inx)=> cur-around +inx),'...',total] 
          }
        }
    }

  class Pageination{
    constructor(total,cur,around,container){
      this.total = total
      this.cur = cur
      this.around = around
      this.ct = document.querySelector(container)
      this.init()
      this.renderDom()
      this.bindEvent()
    }
    init(){
      let baseCount = 2*this.around+2+2+1 // 总共的元素个数
      let startPosition = 1+2+this.around+1 // 前面出现省略号 临界点
      let endPosition = this.total - 1 -2 -this.around // 后面出现省略号 临界点
      let surplus = baseCount - 4 // 当只出现一个省略号元素时 剩余的元素个数
      //总数少于全部展示的元素时全部展示
      if(this.total <= baseCount - 2){ 
        this.list = Array.from({length:this.total},(el,inx)=>{
          return inx+1
        }) //否则出现省略号,省略号分三种情况
      }else{
        if(this.cur < startPosition){ //当前位置小于前省略号临界点,那么后面出现省略号
          this.list = [...Array.from({length:surplus},(el,inx)=> inx+1),'...',this.total]
        }else if(this.cur > endPosition){ //相反同上
          this.list = [1,'...',...Array.from({length:surplus},(el,inx)=>this.total - surplus +inx+1)]
        }else{ //前后同时出现省略号
           this.list = [1,'....',...Array.from({length:this.around*2+1},(el,inx)=> this.cur-this.around +inx),'...',this.total] 
        }
      }      
    }
    renderDom(){
      let temp = ''
      let prev = '<li class="prev">上一页</li>'
      let next = '<li class="next">下一页</li>'
      this.list.forEach(item=>{
        if(item === '...'){
          temp += `<li class="omit-item">${item}</li>`
        }else{
          if(item*1 === this.cur){
            temp+= `<li class="normal-item active">${item}</li>`
          } else {
            temp += `<li class="normal-item">${item}</li>`
          }
        }
      })
      this.ct.innerHTML = prev+temp+next
    }
    bindEvent(){
      this.handler = (e)=>{
        var item = e.target
        this.itemClick(item)
      }
      this.ct.addEventListener('click',this.handler)
    }
    itemClick(el){
      let type = el.className
      switch(type){
        case 'normal-item':
        let page = el.innerText
        // 解绑事件防止多次绑定
        this.ct.removeEventListener('click',this.handler)
        this.getData(page*1)
        break;
        case 'next':
        if(this.cur*1 === this.total) return
        ++this.cur
        this.getData(this.cur)
        this.ct.removeEventListener('click',this.handler)
        break;
        case 'prev':
        if(this.cur*1 === 1) return
        --this.cur
        this.ct.removeEventListener('click',this.handler)
        this.getData(this.cur)
        break;
      }
    }
    siblings(target){
      let child = target.parentNode.children
      let ret = []
      child.forEach(el => {
        if(el.nodeType == 1 && el === target){
          ret.push(el)
        }
      })
      let inx = child.indexOf(target)
      ret.splice(inx,1)
      return ret
    }
    getData(page){
      alert(page)
      new Pageination(this.total,page,2,'.container')
      console.log(this.cur);
    }
  }
  new Pageination(20,20,2,'.container')