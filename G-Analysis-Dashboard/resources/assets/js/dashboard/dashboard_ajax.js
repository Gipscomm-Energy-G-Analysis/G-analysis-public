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
    let dynamicColors = function() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

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
            $("#bar_chart").css('display','none');
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
            
                let machineshards = data.machineshards;
                let shardsData = data.shardsData;
                let html = '';
                $.each(machineshards, function( key, value ) { 
                    let i=1;
                    if(value != 0){  
                        console.log(value);
                        $("#bar_chart").css('display','block');
                        $.each( shardsData, function( key1, value1 ) {
                            if(key1 == key) {
                                 console.log(value1);
                                html += `<div class="chart">
                                                <canvas id="barChart{{i}}" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%; background:#fff;" ></canvas>
                                        </div>`;
                                var areaChartData = {
                                    labels  : ['Time Server'],
                                    datasets: [
                                    {
                                        label               : key+ 'Chart',
                                        backgroundColor     : dynamicColors(),
                                        borderColor         : dynamicColors(),
                                        pointRadius          : false,
                                        pointColor          : '#fff',
                                        pointStrokeColor    : '#fff',
                                        pointHighlightFill  : '#fff',
                                        pointHighlightStroke: dynamicColors(),
                                        data                : [value1]
                                    },
                                    ]
                                }
                                var barChartCanvas = $('#barChart'+i).get(0).getContext('2d')
                                var barChartData = $.extend(true, {}, areaChartData)
                                var temp0 = areaChartData.datasets[0]
                                barChartData.datasets[0] = temp0
                                var barChartOptions = {
                                    responsive              : true,
                                    maintainAspectRatio     : false,
                                    datasetFill             : false
                                }
                                new Chart(barChartCanvas, {
                                    type: 'bar',
                                    data: barChartData,
                                    options: barChartOptions
                                })
                            }
                            i++;
                        });   
                    }
                   
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
        let output = document.getElementById('machine-image');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    };

    //Firing click event on button click
    replaceImageButton.addEventListener('click', () => {
        imageInputField.click();
    });
    //imageInputField.addEventListener('change', loadFile);
    //imageInputField.addEventListener('change', () => {
    $('#machineImage').bind('change', function() {
        let file=(this.files[0].size);
      //  console.log(file);
        if(file > 200000) {
            alert('File size shoold be less than 2mb.');
            return false;
        }
        else{
            let myFormData = new FormData();
            let file = this.files[0];
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
        }
    });

    // var intervalId = window.setInterval(function(){
    //     let type = "current";
    //     let machine_id = $('.navigation').attr('data-value');
    //     getMachineData(machine_id, type);
    // }, 10000);

    $(function () {
        $(".custom-select").on('change',function () {
            let id=(this.id);        
            let value = (this.value);
            let type = "current";
            let machine_id = $('.navigation').attr('data-value');
            $.ajax({
                url:'/dashboard/machine',
                type: 'POST',
                data: {
                    selected_id:id,
                    selected_value:value,
                    id : machine_id,
                    type : type                },
            }).done( function(response) {
                console.log('success');
            });
        });
    });
