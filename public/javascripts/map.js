function getRGB(state, mouseover) {
      switch(state) {
            case 'shandong':
                return 'rgb(200, 100, 0)'
            case 'guangdong':
                return 'rgb(0, 255, 0)'
            case 'chongqing':
                return 'rgb(255, 0, 0)'
            case 'sichuan':
                return 'rgb(255, 0, 0)'
            case 'jiangsu':
                return 'rgb(53, 51, 255)'
            case 'fujian':
                return 'rgb(255, 51, 255)'
            case 'zhejiang':
                return 'rgb(0, 255, 255)'
            case 'hunan':
                return 'rgb(255, 255, 51)'
            case 'anhui':
                return 'rgb(75, 0, 130)'
            default:
                return 'RGB(211, 211, 211)'
      }
}

window.onload = function () {
    var R = Raphael("map", 600, 500);
	//调用绘制地图方法
    paintMap(R);
	
	var textAttr = {
        "fill": "#000",
        "font-size": "12px",
        "cursor": "pointer",
        "font-family":"黑体"
    };
			
           
    for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);
				
        (function (st, state) {
			
			//获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			
            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 10;
                    yy += 10;
                    break;
                case "上海":
                    xx += 10;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 10;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
			//写入文字
			china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr);

            st[0].onmouseover = function () {

                st.animate({fill: getRGB(state), stroke: "#eee"}, 500);
                china[state]['text'].toFront();
                R.safari();
            };
            st[0].onmouseout = function () {
                st.animate({fill: getRGB(state), stroke: "#eee"}, 500);
                china[state]['text'].toFront();
                R.safari();
            };
			st[0].onclick=function () {
                switch(china[state]['name']){
                    case '山东':
                        window.location.href = '/caixi?name=鲁菜';
                        break;
                    case '重庆':
                        window.location.href = '/caixi?name=川菜';
                        break;
                    case '四川':
                        window.location.href = '/caixi?name=川菜';
                        break;
                    case '广东':
                        window.location.href = '/caixi?name=粤菜';
                        break;
                    case '江苏':
                        window.location.href = '/caixi?name=苏菜';
                        break;
                    case '福建':
                        window.location.href = '/caixi?name=闽菜';
                        break;
                    case '浙江':
                        window.location.href = '/caixi?name=浙菜';
                        break;
                    case '湖南':
                        window.location.href = '/caixi?name=湘菜';
                        break;
                    case '安徽':
                        window.location.href = '/caixi?name=徽菜';
                        break;
                }
            }
         })(china[state]['path'], state);
    }
}