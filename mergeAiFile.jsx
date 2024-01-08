/**
 * 이 프로그램은 여러개의 일러스트 및 pdf파일을 하나의 파일로 합치는 프로그램 입니다.
 * This program combines multiple illustrations and pdf files into one file.
 * 개발 : 구명석, unidago.com 
 */
 

function doDisplayDialog(){
    try {

         docRef = app.activeDocument;
         // 경고창이 뜨는것 무시 
         app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS; 
        
      } catch (e) {
        alert('활성화된 문서가 없습니다. 빈문서를 생성후 진행해주세요.');
        return;  
      }

 
    docRef.units = RulerUnits.Millimeters; 
 
    var dialog = new Window(
        "dialog", "파일 합치기" 
    );
 
 
        dialog.spacing = 4; 

        var g1 = dialog.add('group');
            // g1.orientation = 'column';  
            g1.margins = [4,4,4,4];  
 
            var txt1 = g1.add('statictext',undefined, "가로크기(mm)"); 
            txt1.characters = 10; 

            var e1 = g1.add('edittext',undefined, "90"); 
            e1.characters = 8;


        var g2 = dialog.add('group');
           
            g2.margins = [4,4,4,4];  
 
            var txt2 = g2.add('statictext',undefined, "세로크기(mm)"); 
            txt2.characters = 10; 

            var e2 = g2.add('edittext',undefined, "50"); 
            e2.characters = 8; 


        var g3 = dialog.add('group');
           
            g3.margins = [4,4,4,4];  
 
            var txt3 = g3.add('statictext',undefined, "간격(mm)"); 
            txt3.characters = 10; 

            var e3 = g3.add('edittext',undefined, "5"); 
            e3.characters = 8; 



        dialog.folderBtn              = dialog.add('button',    undefined, "문서 합치기",  {name: 'folder'}); 
 
 

        
        var g5 = dialog.add('group');
            // g1.orientation = 'column';  
            g5.margins = [4,4,4,4];  
 
            var txt5 = g5.add('statictext',undefined, "copyright unidago.com"); 
            // txt5.characters = 10; 

            


        dialog.folderBtn.onClick = function() {

            var fileRef = File.openDialog ("합칠 파일을 선택해주세요. ", "*.ai;*.eps;*.pdf", true);
            if(fileRef.length>0) {

 
                  _width   = parseInt(e1.text);
                  _height  = parseInt(e2.text);
                  _gap     = parseInt(e3.text);  

                var startY = -10; 
                var startX = 10; 
                

                progress("Reading Files...");
                progress.set(fileRef.length); 

                for (var i = 0; i < fileRef.length; i++) {
 
                    
                        var placedItem = docRef.placedItems.add();
                        placedItem.file = new File(fileRef[i]);
                        progress.message(File.decode(fileRef[i].name));

                        placedItem.left = startX; 
                        //placedItem.artworkKnockout = true; 
                        placedItem.top = startY; 
                        placedItem.embed();    

                        
                        startX = startX + (_gap*2.834645) + (_width*2.834645); 

                        if(startX+(_gap*2.834645) + (_width*2.834645) >docRef.width) {
                            startY = startY - (_height*2.834645)-(_gap*2.834645); 
                            startX = 10;  
                        }

                        progress.increment();
                        app.redraw(); 
                        
                      

                }

                progress.close(); 
              
 
            }

          
            dialog.close(); 

        }
       

     dialog.show();

 
}




 


doDisplayDialog();


function progress(message) {
    var b;
    var t;
    var w;
    w = new Window("palette", "Progress", undefined, {
        closeButton: false
    });
    t = w.add("statictext", undefined, message);
    t.preferredSize = [450, -1];
    b = w.add("progressbar");
    b.preferredSize = [450, -1];
    progress.close = function () {
        w.close();
    };
    progress.increment = function () {
        b.value++;
        w.update(); 
        $.sleep(50); 
    };
    progress.message = function (message) {
        t.text = message;
        w.update();
    };
    progress.set = function (steps) {
        b.value = 0;
        b.minvalue = 0;
        b.maxvalue = steps;
    };
    w.show();
    w.update();
}

