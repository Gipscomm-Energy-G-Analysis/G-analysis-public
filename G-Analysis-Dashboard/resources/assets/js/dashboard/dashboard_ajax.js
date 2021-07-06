    const navigationHook = document.querySelectorAll('.navigation button');
    const replaceImageButton = document.getElementById('replace-image-button');
    const imageInputField = document.getElementById('machineImage');
    const anl_ID = document.getElementById('anl_ID').value;
    // const getMachineHook = () => {
    //     console.log(this);
    //     let type = this.attr('event-type');
    //     let machine_id = $('.navigation').attr('data-value');
    //     getMachineData(machine_id, type);
    // }
 
    const getMachineData = (machine_id, type) => {
        let container = document.getElementById('data-card');
        let spinner = new Spinner();
        spinner.spin(container);
        $.ajax({
            url:'/dashboard/machine',
            type: 'POST',
            data: {
                id:machine_id,
                type:type
            },
        }).done( function(response) {
            const data = response.data;
            console.log('data',data);
            spinner.stop();
           
            if(response.code == 200 ){
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
                $("#machine-image").on("error", function () {
                    $(this).attr("src", "images/Blasanlage.jpg");
                });
                $.each( data.chartsData, function( key, value) {
                    let id =value.id;
                    let limit = 5;
                    let data_event ='lineChart_'+value.id;
                    getGraphData(id, limit, data_event);
                    lineChartHook('lineChart_'+key, value.lable, value.data, key);
                    $('.time_filter').attr('id','filter_'+key);
                    $('.time_filter').attr('data_value',value.id);
                    $('.time_filter').attr('data_event','lineChart_'+key);
                    
                });

            } else if(response.anl_ID !== undefined) {
                toastr.error(response.message);
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
        });
    }

    //adding event listener to navigation buttons
    navigationHook.forEach((node)=>{
        node.addEventListener('click', function(){
            let type = this.getAttribute('event-type');
            let machine_id = $('.navigation').attr('data-value');
            $(".custom-select").val('');
            getMachineData(machine_id, type);
            
        });
    });

    const loadFile = (event) => {
        let file1, img;
        if(event.target.files[0].size > 200000) {
            alert('File size should be less than 2mb.');
            return false;
        }
        if(file1 = event.target.files[0]){     
            let output = document.getElementById('machine-image');
            img = new Image();
            img.onload = function(){
                //console.log(this.width + "x" + this.height);
                if(this.width + "x" + this.height == '870x621'){
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
                    alert('Image dimensions should be  870 x 621.');
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

   
    
    // var intervalId = window.setInterval(function(){
    //     let type = "current";
    //     let machine_id = $('.navigation').attr('data-value');
    //     getMachineData(machine_id, type);
    //   }, 10000);