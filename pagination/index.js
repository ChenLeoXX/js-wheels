  
  /**
   * 分页器组件
   * @param {Number} total -分页总数
   * @param {Number} cur   - 当前页
   * @param {Number} around - 中间页左右相邻个数
   * @returns {Array} 
   */
  function getPage(total,cur,around){
      let baseCount = 2*around+2+2+1 // 总共的元素个数
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
          return [1,'...',...Array.from({length:surplus},(el,inx=>total-surplus +inx))]
        }else{ //前后同时出现省略号
           return [1,'....',Array.from({length:around*2+1},(el,inx)=> cur-around +inx),'...',total] 
        }
      }
  }
  function renderPagination(){
    // ajax get pageinfo
    var list = getPage(20,1,2)
    let ct = document.querySelector('.container')
    let temp = ''
    let prev = '<li>上一页</li>'
    let next = '<li>下一页</li>'
    list.forEach(item=>{
      temp += `<li>${item}</li>`
    })
    ct.innerHTML = prev+temp+next
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
      let endPosition = total - 1 -2 -this.around // 后面出现省略号 临界点
      let surplus = baseCount - 4 // 当只出现一个省略号元素时 剩余的元素个数
      //总数少于全部展示的元素时全部展示
      if(total <= baseCount - 2){ 
        this.list = Array.from({length:total},(el,inx)=>{
          return inx+1
        }) //否则出现省略号,省略号分三种情况
      }else{
        if(this.total < startPosition){ //当前位置小于前省略号临界点,那么后面出现省略号
          this.list = [...Array.from({length:surplus},(el,inx)=> inx+1),'...',total]
        }else if(this.total > endPosition){ //相反同上
          this.list = [1,'...',...Array.from({length:surplus},(el,inx=>total-surplus +inx))]
        }else{ //前后同时出现省略号
           this.list = [1,'....',Array.from({length:this.around*2+1},(el,inx)=> this.total-this.around +inx),'...',total] 
        }
      }      
    }
    renderDom(){
      let temp = ''
      let prev = '<li class="prev">上一页</li>'
      let next = '<li class="next">下一页</li>'
      this.list.forEach(item=>{
        temp += `<li>${item}</li>`
      })
      this.ct.innerHTML = prev+temp+next
    }
    bindEvent(){
      this.ct.addEventListener('click',(e)=>{
        var item = e.target
        var itemType = item.innerText
        if(itemType !== '...' &&  itemType  !== '下一页' && itemType  !== '上一页'){
          item.classList.add('active')
          this.getData(item.innerText)
        }else if(itemType === '上一页' || itemType === '下一页'){
          switch(itemType){
            case '上一页' :
            
          }
        }
      })
    }
    getData(page){
      alert(page)
    }
  }