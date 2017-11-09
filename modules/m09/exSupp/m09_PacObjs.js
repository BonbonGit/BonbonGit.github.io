			function verifierDirection(direct,x,y){
				var i;
				var j;
				
				switch(direct){
					case 0:
						x = Math.floor(x + 1);
						return theMap.tiles[Math.ceil(y)][x] || theMap.tiles[Math.floor(y)][x];
						break;
					case 1:
						y = Math.floor(y + 1);
						return theMap.tiles[y][Math.ceil(x)] || theMap.tiles[y][Math.floor(x)];
						break;
					case 2:
						x = Math.ceil(x - 1);
						return theMap.tiles[Math.ceil(y)][x] || theMap.tiles[Math.floor(y)][x];
						break;
					case 3:
						y = Math.ceil(y - 1);
						return theMap.tiles[y][Math.ceil(x)] || theMap.tiles[y][Math.floor(x)];
						break;
				}
					
			}
			
			var pacman = {
				v : 1/5,
				direction : -1,
				mvt : false,
				pos_x : 1,
				pos_y : 1,
				color : 'yellow',
				face : 30,
				df : 1,
				live : 3,
				dessiner : function(){
					ctx.translate(this.pos_x*tileDim+20,this.pos_y*tileDim+20);
					ctx.beginPath();
					ctx.rotate(this.direction*Math.PI/2);
					ctx.arc(0,0,18,degToRad(this.face),degToRad(360-this.face),false);
					ctx.lineTo(0,0);
					ctx.closePath();
					ctx.fillStyle = this.color;
					ctx.fill();
					ctx.stroke();
					
				},
				majPos : function(){
					this.pos_x = Math.round(10*this.pos_x)/10
					this.pos_y = Math.round(10*this.pos_y)/10
					
					if(verifierDirection(this.direction,this.pos_x,this.pos_y)){
						this.mvt = false;
					}
					
					if(this.mvt){
						if(this.face == 0){
							this.df = 5;
						} else if(this.face == 30){
							this.df = -5;
						}
						this.face += this.df;
						switch(this.direction){
							case 0:
								this.pos_x += this.v;
								break;
							case 1:
								this.pos_y += this.v;
								break;
							case 2:
								this.pos_x -= this.v;
								break;
							case 3:
								this.pos_y -= this.v;
								break;
						}
					} else{
						this.face = 30;
					}
					
					
				},
				pertPac : function(){
				
					var dx = Math.abs(this.pos_x - fantome.pos_x);
					var dy = Math.abs(this.pos_y - fantome.pos_y);
					
					if(dx < 0.4 && dy < 0.4){
						if(this.live > 0){
							this.live -= 1;
							this.pos_x = 1;
							this.pos_y = 1;
							fantome.pos_x = 23;
							fantome.pos_y = 13;
						} else {
						clearInterval(t);
							alert("Vous avez perdu! :-(");
						}
					}
				
				}
				
			}
			var fantome = {
				v : 1/5,
				direction : 2,
				mvt : true,
				pos_x : 23,
				pos_y : 13,
				
				dessiner : function(){
				
					ctx.translate(this.pos_x*tileDim+20,this.pos_y*tileDim+20);
					ctx.beginPath();
					ctx.arc(0,0,18,degToRad(0),degToRad(180),true);
					ctx.lineTo(-18,18);
					ctx.lineTo(-12,10);
					ctx.lineTo(-6,18);
					ctx.lineTo(0,10);
					ctx.lineTo(6,18);
					ctx.lineTo(12,10);
					ctx.lineTo(18,18);
					ctx.lineTo(18,0);
					ctx.closePath();
					ctx.fillStyle = "lightblue";
					ctx.fill();
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(0,-10,5,degToRad(0),degToRad(360),true);
					ctx.moveTo(-8,-1);
					ctx.arc(-8,-1,5,degToRad(0),degToRad(360),true);
					ctx.moveTo(8,-1);
					ctx.arc(8,-1,5,degToRad(0),degToRad(360),true);
					ctx.closePath();
					ctx.fillStyle = "white";
					ctx.fill();
					ctx.beginPath();
					ctx.arc(0,-10,2,degToRad(0),degToRad(360),true);
					ctx.moveTo(-8,-1);
					ctx.arc(-8,-1,2,degToRad(0),degToRad(360),true);
					ctx.moveTo(8,-1);
					ctx.arc(8,-1,2,degToRad(0),degToRad(360),true);
					ctx.closePath();
					ctx.fillStyle = "blue";
					ctx.fill();
					
					
				},
				majPos : function(){
				
					if(this.direction%2 == 0){
					
						if(!verifierDirection(1,this.pos_x,this.pos_y) || !verifierDirection(3,this.pos_x,this.pos_y)){
							this.chooseDirection();
						}
						
					} else if(this.direction%2 == 1){
					
						if(!verifierDirection(0,this.pos_x,this.pos_y) || !verifierDirection(2,this.pos_x,this.pos_y)){
							this.chooseDirection();
						}
						
					}
					
					this.pos_x = Math.round(10*this.pos_x)/10
					this.pos_y = Math.round(10*this.pos_y)/10
					
					if(verifierDirection(this.direction,this.pos_x,this.pos_y)){
						this.mvt = false;
					} else {
						this.mvt = true;
					}
					
					if(this.mvt){
					
						switch(this.direction){
							case 0:
								this.pos_x += this.v;
								break;
							case 1:
								this.pos_y += this.v;
								break;
							case 2:
								this.pos_x -= this.v;
								break;
							case 3:
								this.pos_y -= this.v;
								break;
						}
						
					}
					
				},
				chooseDirection : function(){
				
					var dx = this.pos_x - pacman.pos_x;
					var dy = this.pos_y - pacman.pos_y;
					
					if(Math.abs(dx) < Math.abs(dy)){
						if(dy > 0){
							this.direction = 3;
						} else{
							this.direction = 1;
						}
					} else if(Math.abs(dx) > Math.abs(dy)){
						if(dx > 0){
							this.direction = 2;
						} else{
							this.direction = 0;
						}
					}
					
					if(verifierDirection(this.direction,this.pos_x,this.pos_y)){
						this.direction = Math.floor(Math.random()*4);
					}
					
					
				},
				
			}
			var theMap = {
				tiles : new Array(),
				pG : new Array(),
				numPG : 0,
				fillPG : function(){
					var i;
					var j;
					
					for(i = 0;i < 15;i++){
						this.pG[i] = [];
					}
					
					for(i = 0;i < 15;i++){
						for(j = 0;j < 25;j++){
							this.pG[i][j] = !this.tiles[i][j];
						}
						
					}
					
					this.pG[1][1] = false;
					this.pG[13][23] = false;
					for(i = 0;i < 15;i++){
						for(j = 0;j < 25;j++){
							if(this.pG[i][j]){
								this.numPG++;
							}
						}
						
					}
				},
				fillMap : function(){
					var i;
					var j;
					
					for(i = 0;i < 15;i++){
						this.tiles[i] = [];
					}
					
					for(i = 0;i < 15;i++){
						for(j = 0;j < 25;j++){
							
							if(i == 0 || i == 14){
								this.tiles[i][j] = true;
							} else if(j == 0 || j == 24){
								this.tiles[i][j] = true;
							} else{
								if((i == 2 || i == 12) && ((j == 2)  || (j >= 4 && j <= 11) || (j >= 13 && j <= 20) || (j == 22))){
									this.tiles[i][j] = true;
								} else if((j == 2 || j == 22) && ((i > 2 && i <= 4) || (i >= 10 && i < 12))){
									this.tiles[i][j] = true;
								} else if((i == 6 || i == 8) && ((j >= 2 && j <= 4) || (j >= 6 && j <= 8) || (j >= 10 && j <= 11) || (j >= 13 && j <= 14) || (j >= 16 && j <= 18) || (j >= 20 && j <= 22))){
									this.tiles[i][j] = true;
								} else if((j == 4 || j == 20) && ((i >= 4 && i <= 5) || (i >= 9 && i <= 10))){
									this.tiles[i][j] = true;
								} else if((i == 4 || i == 10) && ((j >= 5 && j <= 7) || (j >= 9 && j <= 15) || (j >= 17 && j <= 19))){
									this.tiles[i][j] = true;
								} else if((i == 7) && ((j >= 10 && j <= 11) || (j >= 13 && j <= 14))){
									this.tiles[i][j] = true;
								} else{
									this.tiles[i][j] = false;
								}
							}
						}
					}
					
					this.fillPG();
					
				},
				drawMap : function(){
					var i;
					var j;
					
					bgc.fillStyle = "#000000";
					bgc.fillRect(0,0,width,height);
					
					bgc.fillStyle = "#000066";
					for(i = 0;i < 15;i++){
						for(j = 0;j < 25;j++){
							
							if(this.tiles[i][j]){
								bgc.fillRect(j*tileDim,i*tileDim,tileDim,tileDim);
							}
						}
						
					}
					
					bgc.fillStyle = "#ffffff";
					for(i = 0;i < 15;i++){
						for(j = 0;j < 25;j++){
							if(this.pG[i][j]){
								bgc.save();
									bgc.translate(j*tileDim+20,i*tileDim+20);
									bgc.beginPath();
									bgc.arc(0,0,6,0,degToRad(360),false);
									bgc.closePath();
									bgc.fill();
									
								bgc.restore();
							}
						}
						
					}
					
				},
				majPG : function(){
					var x = 0; 
					var y = 0;
					
					switch(pacman.direction){
						case 0:
							x = -0.4;
							break;
						case 1:
							y = -0.4;
							break;
						case 2:
							x = 0.4;
							break;
						case 3:
							y = 0.4;
							break;
					}
					
					x = Math.round(pacman.pos_x+x);
					y = Math.round(pacman.pos_y+y);
					
					if(this.pG[y][x]){
						this.pG[y][x] = false;
						this.numPG--;
						this.drawMap();
					}
					
					if(this.numPG == 0){
						clearInterval(t);
						alert("Bravo! Vous avez gagnez! ;-)");
					}
				},
				
			}