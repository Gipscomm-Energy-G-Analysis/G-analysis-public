    const navigationHook = document.querySelectorAll('.navigation button');
    const replaceImageButton = document.getElementById('replace-image-button');
    const imageInputField = document.getElementById('machineImage');
    const graphDiv = document.getElementById('graph_div');
    const anl_ID = document.getElementById('anl_ID').value;
   
    let machineDataAjax;
    let spinner = new Spinner();
    const graphDivHook = (key, value) => {
        //creating parent div
        let parentDiv = document.createElement('div');
        let parentClass = document.createAttribute('class');
        parentClass.value = 'col-sm-6 main_chart';
        parentDiv.setAttributeNode(parentClass);
        let parentDataValue = document.createAttribute('data_value');
        parentDataValue.value = value.id;
        parentDiv.setAttributeNode(parentDataValue);
        let parentDataEvent = document.createAttribute('data_event');
        parentDataEvent.value = `lineChart_${key}`;
        parentDiv.setAttributeNode(parentDataEvent);
        //creating child div
        let childDiv = document.createElement('div');
        let childClass = document.createAttribute('class');
        childClass.value = 'chart';
        childDiv.setAttributeNode(childClass);
        parentDiv.appendChild(childDiv);
        //creating dynamic canvas
        let canvasDiv = document.createElement('canvas');
        let canvasID = document.createAttribute('id');
        canvasID.value = `lineChart_${key}`;
        canvasDiv.setAttributeNode(canvasID);
        let canvasStyle = document.createAttribute('style');
        canvasStyle.value = 'background:#fff';
        canvasDiv.setAttributeNode(canvasStyle);
        childDiv.appendChild(canvasDiv);
        //appending data to graphDiv
        graphDiv.appendChild(parentDiv);
        lineChartHook('lineChart_'+key, value.label, value.data, key);
    }


    const getMachineData = (machine_id, type, propId='') => {
        var formData = new FormData();
        let prop_id = document.getElementById("select_prop").value;
        let container = document.getElementById('data-card');
        formData.append("id", machine_id);
        formData.append("type", type);
        formData.append("prop_id", prop_id);
        spinner.spin(container);
        machineDataAjax = $.ajax({
            url:'/dashboard/machine',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
        }).done( function(response) {
            const data = response.data;
            spinner.stop();
            if(response.code == 200 ){
                graphDiv.innerHTML = '';
               
                $("#data-card").show();
                $("#bar_chart").show();
                $("#msg").hide();
                $('.navigation').attr('data-value', data.anl_ID);
                $('#anl_ID').val(data.anl_ID);
                $('#anlage').val(data.anlage);
                $('#programm').val(data.programm);
                $('#artikel').val(data.artikel);
                $('#bestellung').val(data.bestellung);
                // $('#bisher_produziert').val(data.bisher_produziert);
                $('#auftragsmenge').val(data.auftragsmenge);
                $('#gutmenge').val(data.gutmenge);
                $('#ausschuss').val(data.ausschuss);
                $('#zeit_zyklus').val(data.zeit_zyklus);
                if(data.programm == 'Automatik'){
                    data.letzte_störung = " ";
                }
                $('#letzte_störung').val(data.letzte_störung);
                $('#werkzeug').val(data.werkzeug);
                $('#kavitäten').val(data.kavitäten);
                $('#machine-image').attr('src',data.bildAnl);
                $('#timeFilter').val('5');
                $("#machine-image").on("error", function () {
                    $(this).attr("src", "images/Blasanlage.jpg");
                });
                $.each( data.chartsData, function( key, value) {
                    graphDivHook(key, value);
                });

            } else if(response.anl_ID !== undefined) {
                toastr.error(response.message);
               
                $("#data-card").show();
                // $("#not_found_msg").hide();
                $('.navigation').attr('data-value', response.anl_ID);
                $('#anlage').val("");
                $('#programm').val("");
                $('#artikel').val("");
                $('#bestellung').val("");
                // $('#bisher_produziert').val("");
                $('#auftragsmenge').val("");
                $('#gutmenge').val("");
                $('#ausschuss').val("");
                $('#zeit_zyklus').val("");
                $('#letzte_störung').val("");
                $('#werkzeug').val("");
                $('#kavitäten').val("");
                $('#machine-image').attr('src','images/Blasanlage.jpg');
            }
            else{
              
               
               $("#data-card").hide();
               $("#bar_chart").hide();
               $("#msg").show();
            }
        });
    }

    //adding event listener to navigation buttons
    navigationHook.forEach((node)=>{
        node.addEventListener('click', function(){
            spinner.stop();
            machineDataAjax.abort();
            let type = this.getAttribute('event-type');
            let machine_id = $('.navigation').attr('data-value');
            $(".custom-select").val('');
            getMachineData(machine_id, type, propId='');
        });
    });

    const loadFile = (event) => {
        let file1, img;
        if(event.target.files[0].size > 2000000) {
            alert('File size should be less than 2mb.');
            return false;
        }
        if(file1 = event.target.files[0]){
            let output = document.getElementById('machine-image');
            img = new Image();
            img.onload = function(){
                //console.log(this.width + "x" + this.height);
                if(this.width <= 870 && this.height <= 621){
                    output.src = URL.createObjectURL(event.target.files[0]);
                    let myFormData = new FormData();
                    let file = event.target.files[0];
                    const anl_ID = $('#anl_ID').val();
                    myFormData.append('file',file);
                    myFormData.append('anl_ID',anl_ID);
                    $.ajax({
                        headers:{'X-CSRF-Token':$('meta[name=csrf_token]').attr('content')},
                        type:"post",
                        async: true,
                        contentType: false,
                        cache: false,
                        processData:false,
                        url:`/uploadImage`,
                        data:myFormData,
                        success:function(data){
                            console.log("success");
                        }
                    });
                }else{
                    alert('Image dimensions should be smaller than or equal to  870 x 621.');
                    return false;
                }
               // URL.revokeObjectURL(output.src)
            };
            img.onerror = function() {
                alert( "not a valid file: " + file1.type);
            };
            img.src = URL.createObjectURL(file1);
        }
    };

    //Firing click event on button click
    replaceImageButton.addEventListener('click', () => {
        imageInputField.click();
    });
    imageInputField.addEventListener('change', loadFile);

    var intervalId = window.setInterval(function(){
        let type = "current";
        let machine_id = $('.navigation').attr('data-value');
        getMachineData(machine_id, type, propId='');
      }, 10000);
    

    function select_org() {
        let orgId  = document.getElementById("select_org").value;
        let dbName = document.getElementById("nameDB").value;
        $('.liegenschaft').html("");
        $.ajax({
            url:'/dashboard/propertyData',
            type: 'POST',
                data: {
                    orgId:orgId,
                    dbName:dbName
                },
            }).done( function(response) {
                $('.liegenschaft').append('<option value="">Please Select--</option>');
                $.each(response, function(key, value) {
                   $('.liegenschaft').append('<option value="'+ value.lieg_ID +'">'+ value.nameLieg +'</option>');
                });
        });
       
    }
  
    


