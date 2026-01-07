'use strict';

(function(window){
  const constants = window.PacmanConstants;
  const cos = constants.DIRECTIONS.COS;
  const sin = constants.DIRECTIONS.SIN;

  function buildStages(game, levels, state){
    createStartStage(game);
    levels.forEach(function(levelConfig, index){
      createLevelStage(game, levelConfig, index, state);
    });
    createEndStage(game, state);
  }

  function createStartStage(game){
    const stage = game.createStage();
    createBackgroundParticles(stage, game);
    createLogo(stage, game);
    createStartGhosts(stage, game);
    createTitle(stage, game);
    createSubtitle(stage, game);
    createPrompt(stage, game);
    createControlHint(stage, game);
    createDecorativeCorners(stage, game);
    stage.bind('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        game.nextStage();
      }
    });
  }

  function createBackgroundParticles(stage, game){
    for(let i=0;i<40;i++){
      stage.createItem({
        x:Math.random()*game.width,
        y:Math.random()*game.height,
        width:2+Math.random()*4,
        frames:60+Math.random()*120,
        alpha:0.2+Math.random()*0.4,
        speed:0.3+Math.random()*1,
        direction:Math.random()*Math.PI*2,
        update:function(){
          this.x += Math.cos(this.direction)*this.speed;
          this.y += Math.sin(this.direction)*this.speed;
          if(this.x<0){ this.x = game.width; }
          if(this.x>game.width){ this.x = 0; }
          if(this.y<0){ this.y = game.height; }
          if(this.y>game.height){ this.y = 0; }
        },
        draw:function(context){
          context.save();
          context.globalAlpha = this.alpha;
          context.fillStyle = '#FFE600';
          context.beginPath();
          context.arc(this.x,this.y,this.width,0,Math.PI*2);
          context.fill();
          context.restore();
        }
      });
    }
  }

  function createLogo(stage, game){
    stage.createItem({
      x:game.width/2,
      y:game.height*0.28,
      width:120,
      height:120,
      frames:3,
      draw:function(context){
        const t = Math.abs(5-this.times%10);
        const mouthAngle = t*0.04*Math.PI;
        context.fillStyle = 'rgba(0,0,0,0.3)';
        context.beginPath();
        context.ellipse(this.x,this.y+65,50,10,0,0,Math.PI*2);
        context.fill();
        context.fillStyle = '#FFE600';
        context.beginPath();
        context.arc(this.x,this.y,this.width/2,mouthAngle,Math.PI*2-mouthAngle,false);
        context.lineTo(this.x,this.y);
        context.closePath();
        context.fill();
        context.fillStyle = '#000';
        context.beginPath();
        context.arc(this.x+10,this.y-20,8,0,Math.PI*2);
        context.fill();
      }
    });
  }

  function createStartGhosts(stage, game){
    const ghostColors = ['#FF0000','#FFB8FF','#00FFFF','#FFB852'];
    const ghostNames = ['BLINKY','PINKY','INKY','CLYDE'];
    for(let i=0;i<4;i++){
      (function(index){
        stage.createItem({
          x:game.width/2-150+index*100,
          y:game.height*0.52,
          width:45,
          height:45,
          color:ghostColors[index],
          name:ghostNames[index],
          frames:40,
          offsetY:0,
          update:function(){
            this.offsetY = Math.sin(this.times*0.15+index*0.5)*8;
          },
          draw:function(context){
            context.save();
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x,this.y+this.offsetY,this.width/2,Math.PI,0,false);
            const waveY = this.y+this.offsetY+this.height/3;
            context.lineTo(this.x+this.width/2,waveY);
            context.lineTo(this.x+this.width/3,waveY-6);
            context.lineTo(this.x+this.width/6,waveY);
            context.lineTo(this.x,waveY-6);
            context.lineTo(this.x-this.width/6,waveY);
            context.lineTo(this.x-this.width/3,waveY-6);
            context.lineTo(this.x-this.width/2,waveY);
            context.closePath();
            context.fill();
            context.fillStyle = '#FFF';
            context.beginPath();
            context.arc(this.x-10,this.y+this.offsetY-8,7,0,Math.PI*2);
            context.arc(this.x+10,this.y+this.offsetY-8,7,0,Math.PI*2);
            context.fill();
            context.fillStyle = '#000';
            context.beginPath();
            context.arc(this.x-10,this.y+this.offsetY-6,4,0,Math.PI*2);
            context.arc(this.x+10,this.y+this.offsetY-6,4,0,Math.PI*2);
            context.fill();
            context.restore();
          }
        });
      })(i);
    }
  }

  function createTitle(stage, game){
    stage.createItem({
      x:game.width/2,
      y:game.height*0.65,
      frames:60,
      draw:function(context){
        context.font = 'bold 52px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.shadowColor = '#FFE600';
        context.shadowBlur = 25;
        context.fillStyle = '#FFF';
        context.fillText('PAC-MAN',this.x,this.y);
        context.shadowBlur = 0;
      }
    });
  }

  function createSubtitle(stage, game){
    stage.createItem({
      x:game.width/2,
      y:game.height*0.72,
      draw:function(context){
        context.font = '14px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#FFE600';
        context.fillText('RETRO ARCADE GAME',this.x,this.y);
      }
    });
  }

  function createPrompt(stage, game){
    stage.createItem({
      x:game.width/2,
      y:game.height*0.82,
      frames:30,
      alpha:1,
      update:function(){
        this.alpha = 0.4+Math.abs(Math.sin(this.times*0.12))*0.6;
      },
      draw:function(context){
        context.save();
        context.globalAlpha = this.alpha;
        context.font = 'bold 18px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#FFF';
        context.fillText('PRESS ENTER TO START',this.x,this.y);
        context.restore();
      }
    });
  }

  function createControlHint(stage, game){
    stage.createItem({
      x:game.width/2,
      y:game.height*0.90,
      draw:function(context){
        context.font = '11px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#888';
        context.fillText('ARROWS/WASD TO MOVE | SPACE TO PAUSE',this.x,this.y);
      }
    });
  }

  function createDecorativeCorners(stage, game){
    const corners = [
      {x:40,y:40},
      {x:game.width-40,y:40},
      {x:40,y:game.height-40},
      {x:game.width-40,y:game.height-40}
    ];
    corners.forEach(function(corner){
      stage.createItem({
        x:corner.x,
        y:corner.y,
        width:25,
        height:25,
        rotation:0,
        frames:80,
        update:function(){
          this.rotation += 0.015;
        },
        draw:function(context){
          context.save();
          context.translate(this.x,this.y);
          context.rotate(this.rotation);
          context.strokeStyle = '#FFE600';
          context.lineWidth = 2;
          context.beginPath();
          context.rect(-this.width/2,-this.height/2,this.width,this.height);
          context.stroke();
          context.fillStyle = '#FFE600';
          context.beginPath();
          context.arc(0,0,4,0,Math.PI*2);
          context.fill();
          context.restore();
        }
      });
    });
  }

  function createLevelStage(game, config, levelIndex, state){
    let map;
    let beans;
    let player;
    let ghosts = [];

    const stage = game.createStage({
      update:function(){
        if(stage.status===1){
          ghosts.forEach(function(ghost){
            if(map && !map.get(ghost.coord.x,ghost.coord.y) && !map.get(player.coord.x,player.coord.y)){
              const dx = ghost.x - player.x;
              const dy = ghost.y - player.y;
              if(dx*dx + dy*dy < 750 && ghost.status!==4){
                if(ghost.status===3){
                  ghost.status = 4;
                  state.score += constants.SCORE.ghostBonus;
                }else{
                  stage.status = 3;
                  stage.timeout = 30;
                }
              }
            }
          });
          if(JSON.stringify(beans.data).indexOf(0)<0){
            game.nextStage();
          }
        }else if(stage.status===3){
          if(!stage.timeout){
            state.life--;
            if(state.life){
              stage.resetItems();
            }else{
              const stages = game.getStages();
              game.setStage(stages.length-1);
              return false;
            }
          }
        }
      }
    });

    map = createMaze(stage, config);
    beans = createBeans(stage, config);
    createHud(stage, state, levelIndex);
    ghosts = createGhosts(stage, config, map, function(){ return player; }, function(){ return ghosts; });
    player = createPlayer(stage, map, beans, config, state, function(){ return ghosts; });

    stage.bind('keydown',function(e){
      switch(e.key){
        case 'Enter':
        case ' ':
          this.status = this.status===2?1:2;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          player.nextOrientation = 0;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          player.nextOrientation = 1;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          player.nextOrientation = 2;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          player.nextOrientation = 3;
          break;
      }
    });
    return stage;
  }

  function createMaze(stage, config){
    return stage.createMap({
      x:60,
      y:10,
      data:config['map'],
      cache:true,
      draw:function(context){
        context.lineWidth = 2;
        for(let j=0;j<this.y_length;j++){
          for(let i=0;i<this.x_length;i++){
            const value = this.get(i,j);
            if(value){
              const code = [0,0,0,0];
              if(this.get(i+1,j)&&!(this.get(i+1,j-1)&&this.get(i+1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){ code[0]=1; }
              if(this.get(i,j+1)&&!(this.get(i-1,j+1)&&this.get(i+1,j+1)&&this.get(i-1,j)&&this.get(i+1,j))){ code[1]=1; }
              if(this.get(i-1,j)&&!(this.get(i-1,j-1)&&this.get(i-1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){ code[2]=1; }
              if(this.get(i,j-1)&&!(this.get(i-1,j-1)&&this.get(i+1,j-1)&&this.get(i-1,j)&&this.get(i+1,j))){ code[3]=1; }
              if(code.indexOf(1)>-1){
                context.strokeStyle = value==2?'#FFF':config['wall_color'];
                const pos = this.coord2position(i,j);
                switch(code.join('')){
                  case '1100':
                    context.beginPath();
                    context.arc(pos.x+this.size/2,pos.y+this.size/2,this.size/2,Math.PI,1.5*Math.PI,false);
                    context.stroke();
                    context.closePath();
                    break;
                  case '0110':
                    context.beginPath();
                    context.arc(pos.x-this.size/2,pos.y+this.size/2,this.size/2,1.5*Math.PI,2*Math.PI,false);
                    context.stroke();
                    context.closePath();
                    break;
                  case '0011':
                    context.beginPath();
                    context.arc(pos.x-this.size/2,pos.y-this.size/2,this.size/2,0,.5*Math.PI,false);
                    context.stroke();
                    context.closePath();
                    break;
                  case '1001':
                    context.beginPath();
                    context.arc(pos.x+this.size/2,pos.y-this.size/2,this.size/2,.5*Math.PI,1*Math.PI,false);
                    context.stroke();
                    context.closePath();
                    break;
                  default:
                    const dist = this.size/2;
                    code.forEach(function(v,index){
                      if(v){
                        context.beginPath();
                        context.moveTo(pos.x,pos.y);
                        context.lineTo(pos.x-cos[index]*dist,pos.y-sin[index]*dist);
                        context.stroke();
                        context.closePath();
                      }
                    });
                }
              }
            }
          }
        }
      }
    });
  }

  function createBeans(stage, config){
    return stage.createMap({
      x:60,
      y:10,
      data:config['map'],
      frames:8,
      draw:function(context){
        for(let j=0;j<this.y_length;j++){
          for(let i=0;i<this.x_length;i++){
            if(!this.get(i,j)){
              const pos = this.coord2position(i,j);
              context.fillStyle = '#F5F5DC';
              if(config['goods'][i+','+j]){
                context.beginPath();
                context.arc(pos.x,pos.y,3+this.times%2,0,2*Math.PI,true);
                context.fill();
                context.closePath();
              }else{
                context.fillRect(pos.x-2,pos.y-2,4,4);
              }
            }
          }
        }
      }
    });
  }

  function createHud(stage, state, levelIndex){
    stage.createItem({
      x:690,
      y:80,
      draw:function(context){
        context.font = 'bold 24px PressStart2P';
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillStyle = '#C33';
        context.fillText('SCORE',this.x,this.y);
        context.font = '24px PressStart2P';
        context.textBaseline = 'top';
        context.fillStyle = '#FFF';
        context.fillText(state.score,this.x+12,this.y+10);
        context.font = 'bold 24px PressStart2P';
        context.textBaseline = 'bottom';
        context.fillStyle = '#C33';
        context.fillText('LEVEL',this.x,this.y+72);
        context.font = '24px PressStart2P';
        context.textBaseline = 'top';
        context.fillStyle = '#FFF';
        context.fillText(levelIndex+1,this.x+12,this.y+82);
      }
    });

    stage.createItem({
      x:690,
      y:285,
      frames:25,
      draw:function(context){
        if(stage.status==2&&this.times%2){
          context.font = '24px PressStart2P';
          context.textAlign = 'left';
          context.textBaseline = 'center';
          context.fillStyle = '#FFF';
          context.fillText('PAUSE',this.x,this.y);
        }
      }
    });

    stage.createItem({
      x:705,
      y:510,
      width:30,
      height:30,
      draw:function(context){
        const max = Math.min(state.life-1,5);
        for(let i=0;i<max;i++){
          const x=this.x+40*i,y=this.y;
          context.fillStyle = '#FFE600';
          context.beginPath();
          context.arc(x,y,this.width/2,.15*Math.PI,-.15*Math.PI,false);
          context.lineTo(x,y);
          context.closePath();
          context.fill();
        }
        context.font = '18px PressStart2P';
        context.textAlign = 'left';
        context.textBaseline = 'center';
        context.fillStyle = '#FFF';
        context.fillText('X',this.x-15,this.y+30);
        context.font = '24px PressStart2P';
        context.fillText((state.life-1),this.x+10,this.y+26);
      }
    });
  }

  function createGhosts(stage, config, map, getPlayer, getGhosts){
    const start = constants.GHOST.START_COORD;
    return constants.NPC_COLORS.map(function(color,index){
      return stage.createItem({
        width:30,
        height:30,
        orientation:3,
        color:color,
        location:map,
        coord:{x:start.x+index,y:start.y},
        vector:{x:start.x+index,y:start.y},
        type:2,
        frames:10,
        speed:constants.GHOST.SPEED,
        timeout:Math.floor(Math.random()*120),
        update:function(){
          const player = getPlayer();
          const ghosts = getGhosts();
          let newMap;
          if(this.status==3&&!this.timeout){
            this.status = 1;
          }
          if(!this.coord.offset){
            if(this.status==1){
              if(!this.timeout){
                newMap = buildWalkableMap(map.data, ghosts, this._id, true);
                this.path = map.finder({map:newMap,start:this.coord,end:player.coord});
                if(this.path.length){
                  this.vector = this.path[0];
                }
              }
            }else if(this.status==3){
              newMap = buildWalkableMap(map.data, ghosts, this._id, false);
              this.path = map.finder({map:newMap,start:player.coord,end:this.coord,type:'next'});
              if(this.path.length){
                this.vector = this.path[Math.floor(Math.random()*this.path.length)];
              }
            }else if(this.status==4){
              newMap = buildWalkableMap(map.data, [], this._id, false);
              this.path = map.finder({map:newMap,start:this.coord,end:this._params.coord});
              if(this.path.length){
                this.vector = this.path[0];
              }else{
                this.status = 1;
              }
            }
            if(this.vector.change){
              this.coord.x = this.vector.x;
              this.coord.y = this.vector.y;
              const pos = map.coord2position(this.coord.x,this.coord.y);
              this.x = pos.x;
              this.y = pos.y;
            }
            if(this.vector.x>this.coord.x){
              this.orientation = 0;
            }else if(this.vector.x<this.coord.x){
              this.orientation = 2;
            }else if(this.vector.y>this.coord.y){
              this.orientation = 1;
            }else if(this.vector.y<this.coord.y){
              this.orientation = 3;
            }
          }
          this.x += this.speed*cos[this.orientation];
          this.y += this.speed*sin[this.orientation];
        },
        draw:function(context){
          let isSick = false;
          if(this.status==3){
            isSick = this.timeout>80||this.times%2?true:false;
          }
          if(this.status!=4){
            context.fillStyle = isSick?'#BABABA':this.color;
            context.beginPath();
            context.arc(this.x,this.y,this.width*.5,0,Math.PI,true);
            switch(this.times%2){
              case 0:
                context.lineTo(this.x-this.width*.5,this.y+this.height*.4);
                context.quadraticCurveTo(this.x-this.width*.4,this.y+this.height*.5,this.x-this.width*.2,this.y+this.height*.3);
                context.quadraticCurveTo(this.x,this.y+this.height*.5,this.x+this.width*.2,this.y+this.height*.3);
                context.quadraticCurveTo(this.x+this.width*.4,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.4);
                break;
              case 1:
                context.lineTo(this.x-this.width*.5,this.y+this.height*.3);
                context.quadraticCurveTo(this.x-this.width*.25,this.y+this.height*.5,this.x,this.y+this.height*.3);
                context.quadraticCurveTo(this.x+this.width*.25,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.3);
                break;
            }
            context.fill();
            context.closePath();
          }
          context.fillStyle = '#FFF';
          if(isSick){
            context.beginPath();
            context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
            context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
            context.fill();
            context.closePath();
          }else{
            context.beginPath();
            context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
            context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
            context.fill();
            context.closePath();
            context.fillStyle = '#000';
            context.beginPath();
            context.arc(this.x-this.width*(.15-.04*cos[this.orientation]),this.y-this.height*(.21-.04*sin[this.orientation]),this.width*.07,0,2*Math.PI,false);
            context.arc(this.x+this.width*(.15+.04*cos[this.orientation]),this.y-this.height*(.21-.04*sin[this.orientation]),this.width*.07,0,2*Math.PI,false);
            context.fill();
            context.closePath();
          }
        }
      });
    });
  }

  function buildWalkableMap(baseMap, ghosts, skipId, onlyActive){
    const newMap = JSON.parse(JSON.stringify(baseMap).replace(/2/g,0));
    if(ghosts&&ghosts.length){
      ghosts.forEach(function(item){
        if(item._id!==skipId && (!onlyActive || item.status==1)){
          newMap[item.coord.y][item.coord.x] = 1;
        }
      });
    }
    return newMap;
  }

  function createPlayer(stage, map, beans, config, state, getGhosts){
    return stage.createItem({
      width:30,
      height:30,
      type:1,
      location:map,
      coord:{x:constants.PLAYER.START_COORD.x,y:constants.PLAYER.START_COORD.y},
      orientation:2,
      speed:constants.PLAYER.SPEED,
      frames:10,
      update:function(){
        let coord = this.coord;
        
        // 1. Buffered Turn Logic
        if(typeof this.nextOrientation != 'undefined' && this.nextOrientation != this.orientation){
          if(coord.offset <= this.speed){
            const targetX = coord.x + cos[this.nextOrientation];
            const targetY = coord.y + sin[this.nextOrientation];
            if(!map.get(targetX, targetY)){
              const pos = map.coord2position(coord.x, coord.y);
              this.x = pos.x;
              this.y = pos.y;
              this.orientation = this.nextOrientation;
              this.nextOrientation = undefined;
              this.coord = map.position2coord(this.x, this.y);
              coord = this.coord;
            }
          }
        }

        // 2. Movement Logic
        const nextX = coord.x + cos[this.orientation];
        const nextY = coord.y + sin[this.orientation];
        const value = map.get(nextX, nextY);

        if(value == 0 || value < 0){
           this.x += this.speed*cos[this.orientation];
           this.y += this.speed*sin[this.orientation];
        } else {
           if(coord.offset <= this.speed){
             const pos = map.coord2position(coord.x, coord.y);
             this.x = pos.x;
             this.y = pos.y;
           } else {
             this.x += this.speed*cos[this.orientation];
             this.y += this.speed*sin[this.orientation];
           }
        }
        
        // Stop at wall if we hit it (and are centered)
        if(coord.offset <= this.speed && map.get(coord.x + cos[this.orientation], coord.y + sin[this.orientation]) == 1){
             const pos = map.coord2position(coord.x, coord.y);
             this.x = pos.x;
             this.y = pos.y;
        }

        // Wrap
        if(map.get(coord.x + cos[this.orientation], coord.y + sin[this.orientation]) < 0){
             this.x -= map.size*(map.x_length-1)*cos[this.orientation];
             this.y -= map.size*(map.y_length-1)*sin[this.orientation];
        }

        // Eat beans
        if(!beans.get(this.coord.x,this.coord.y)){
            state.score += constants.SCORE.pellet;
            beans.set(this.coord.x,this.coord.y,1);
            if(config['goods'][this.coord.x+','+this.coord.y]){
              getGhosts().forEach(function(item){
                if(item.status==1||item.status==3){
                  item.timeout = 450;
                  item.status = 3;
                }
              });
            }
        }
      },
      draw:function(context){
        context.fillStyle = '#FFE600';
        context.beginPath();
        if(stage.status!=3){
          if(this.times%2){
            context.arc(this.x,this.y,this.width/2,(.5*this.orientation+.20)*Math.PI,(.5*this.orientation-.20)*Math.PI,false);
          }else{
            context.arc(this.x,this.y,this.width/2,(.5*this.orientation+.01)*Math.PI,(.5*this.orientation-.01)*Math.PI,false);
          }
        }else{
          if(stage.timeout){
            context.arc(this.x,this.y,this.width/2,(.5*this.orientation+1-.02*stage.timeout)*Math.PI,(.5*this.orientation-1+.02*stage.timeout)*Math.PI,false);
          }
        }
        context.lineTo(this.x,this.y);
        context.closePath();
        context.fill();
      }
    });
  }

  function createEndStage(game, state){
    const stage = game.createStage();
    stage.createItem({
      x:game.width/2,
      y:game.height*.35,
      draw:function(context){
        context.fillStyle = '#FFF';
        context.font = 'bold 48px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(state.life?'YOU WIN!':'GAME OVER',this.x,this.y);
      }
    });
    stage.createItem({
      x:game.width/2,
      y:game.height*.5,
      draw:function(context){
        context.fillStyle = '#FFF';
        context.font = '20px PressStart2P';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('FINAL SCORE: '+(state.score+constants.SCORE.lifeBonus*Math.max(state.life-1,0)),this.x,this.y);
      }
    });
    stage.bind('keydown',function(e){
      switch(e.key){
        case 'Enter':
        case ' ':
          state.score = 0;
          state.life = constants.DEFAULT_LIFE;
          game.setStage(1);
          break;
      }
    });
  }

  window.PacmanStages = {
    buildStages: buildStages
  };
})(window);
