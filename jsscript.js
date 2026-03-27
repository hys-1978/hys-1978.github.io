let buyData = [];
let sellData = [];

// 商品初始已售数量
let soldCount = {
    1: 0,
    2: 0,
    3: 0
};

// 防频繁操作
let lastClick = 0;
let lastSubmit = 0;

// 打开商品详情
function openDetail(id){
    let now = Date.now();
    if(now - lastClick < 1000){
        alert("操作过于频繁，请稍后再试！");
        return;
    }
    lastClick = now;

    let priceList = {1:25, 2:8, 3:12};
    let stockList = {1:120, 2:300, 3:200};
    let data;

    if(id==1){
        data=`
        <h2>化学实验基础套装</h2><br>
        <p><strong>价格：¥25</strong></p>
        <p>库存：${stockList[1]}套</p>
        <p>已售：${soldCount[1]}</p><br>
        <p>内含：试管、滴管、烧杯、护目镜等基础实验用品</p><br>
        <div class="form-item">
            <label>选择款式</label>
            <select id="style">
                <option>标准版</option>
                <option>进阶版</option>
            </select>
        </div>
        <div class="form-item">
            <label>购买数量</label>
            <input type="number" id="num" value="1" min="1" oninput="calc(${priceList[1]})">
        </div>
        <div class="form-item">
            <label>总价：<span id="total" style="color:red">25</span> 元</label>
        </div>
        <div class="form-item">
            <label>姓名</label>
            <input id="username">
        </div>
        <div class="form-item">
            <label>班级</label>
            <input id="userclass">
	</div>
       	 <div class="form-item">
        	 <label>学号</label>
        	<input id="userorder">
        </div>
        <button class="btn" onclick="submitBuy(1)">提交购买</button>`;
    }
    if(id==2){
        data=`
        <h2>化学英才社徽章</h2><br>
        <p><strong>价格：¥8</strong></p>
        <p>库存：${stockList[2]}</p>
        <p>已售：${soldCount[2]}</p><br>
        <p>金属质感，社团专属纪念徽章</p><br>
        <div class="form-item">
            <label>选择款式</label>
            <select id="style">
                <option>圆形款</option>
                <option>方形款</option>
            </select>
        </div>
        <div class="form-item">
            <label>购买数量</label>
            <input type="number" id="num" value="1" min="1" oninput="calc(${priceList[2]})">
        </div>
        <div class="form-item">
            <label>总价：<span id="total" style="color:red">8</span> 元</label>
        </div>
        <div class="form-item">
            <label>姓名</label>
            <input id="username">
        </div>
        <div class="form-item">
            <label>班级</label>
            <input id="userclass">
        </div>
        <button class="btn" onclick="submitBuy(2)">提交购买</button>`;
    }
    if(id==3){
        data=`
        <h2>化学笔记专用本</h2><br>
        <p><strong>价格：¥12</strong></p>
        <p>库存：${stockList[3]}</p>
        <p>已售：${soldCount[3]}</p><br>
        <p>内页带元素周期表，加厚纸张</p><br>
        <div class="form-item">
            <label>选择款式</label>
            <select id="style">
                <option>白色</option>
                <option>绿色</option>
            </select>
        </div>
        <div class="form-item">
            <label>购买数量</label>
            <input type="number" id="num" value="1" min="1" oninput="calc(${priceList[3]})">
        </div>
        <div class="form-item">
            <label>总价：<span id="total" style="color:red">12</span> 元</label>
        </div>
        <div class="form-item">
            <label>姓名</label>
            <input id="username">
        </div>
        <div class="form-item">
            <label>班级</label>
            <input id="userclass">
        </div>
        <button class="btn" onclick="submitBuy(3)">提交购买</button>`;
    }
    document.getElementById("detailContent").innerHTML=data;
    document.getElementById("detailModal").style.display="block";
}

// 计算总价
function calc(price){
    let num = document.getElementById("num").value;
    document.getElementById("total").innerText = price * num;
}

// 关闭详情
function closeDetail(){
    document.getElementById("detailModal").style.display="none";
}

// 提交购买（含验证 + 防频繁 + 动态已售）
function submitBuy(gid){
    let now = Date.now();
    if(now - lastSubmit < 3000){
        alert("操作过于频繁，请3秒后再提交！");
        return;
    }

    let name = document.getElementById("username").value.trim();
    let cls = document.getElementById("userclass").value.trim();
    let num = document.getElementById("num").value;
    let total = document.getElementById("total").innerText;
    let style = document.getElementById("style").value;
    let order= document.getElementById("userorder").value;

    // 表单验证
    if(!name || !cls || !num || num < 1){
        alert("提交失败！请填写完整信息（姓名、班级、数量）");
        return;
    }

    lastSubmit = now;
    let goodName = gid==1?"化学实验基础套装":gid==2?"化学英才社徽章":"化学笔记专用本";
    let time = new Date().toLocaleString();

    // 已售数量 + 购买数量
    soldCount[gid] += parseInt(num);
    document.getElementById(`sold-${gid}`).innerText = `已售：${soldCount[gid]}`;

    buyData.unshift({time,name,cls,goodName,style,num,total,order});
    alert("购买信息提交成功！");
    closeDetail();
}

// 提交寄卖（含验证 + 防频繁）
function submitSell(){
    let now = Date.now();
    if(now - lastSubmit < 3000){
        alert("操作过于频繁，请3秒后再提交！");
        return;
    }

    let name = document.getElementById("sname").value.trim();
    let cls = document.getElementById("sclass").value.trim();
    let goods = document.getElementById("sgoods").value.trim();
    let cnt = document.getElementById("scount").value;

    if(!name || !cls || !goods || !cnt || cnt < 1){
        alert("提交失败！请填写完整寄卖信息");
        return;
    }

    lastSubmit = now;
    let info = document.getElementById("sinfo").value;
    let time = new Date().toLocaleString();
    sellData.unshift({time,name,cls,goods,cnt,info});
    alert("寄卖申请提交成功！");
}

// 显示后台登录
function showAdminLogin(){
    document.getElementById("adminModal").style.display="block";
}
// 新增：关闭后台登录弹窗（退出按钮）
function closeAdminModal(){
    document.getElementById("adminModal").style.display="none";
}

// 验证密码
function checkAdmin(){
    let pwd = document.getElementById("pwd").value;
    if(pwd=="40chem2026"){
        document.getElementById("adminModal").style.display="none";
        document.getElementById("adminPanel").style.display="block";
        showData();
    }else{
        alert("密码错误！");
    }
}

// 后台显示数据
function showData(){
    let bhtml="";
    buyData.forEach(item=>{
        bhtml+=`<div class='log-item'><strong>${item.time}</strong><br>姓名：${item.name}｜班级：${item.cls}<br>商品：${item.goodName}｜款式：${item.style}｜数量：${item.num}｜总价：${item.total}元｜学号：${item.order}</div>`;
    });
    let shtml="";
    sellData.forEach(item=>{
        shtml+=`<div class='log-item'><strong>${item.time}</strong><br>寄卖人：${item.name} ${item.cls}班<br>物品：${item.goods} × ${item.cnt}<br>详情：${item.info}</div>`;
    });
    document.getElementById("buyList").innerHTML=bhtml;
    document.getElementById("sellList").innerHTML=shtml;
}