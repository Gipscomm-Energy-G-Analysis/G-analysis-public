const navigationHook = document.querySelectorAll('.navigation button');
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
        spinner.stop();
        if(response.code == 200 ){
            $('.navigation').attr('data-value', data.anl_ID);
            $('#anlage').val(data.anlage);
            $('#programm').val(data.programm);
            $('#artikel').val(data.artikel);
            $('#bisher_produziert').val(data.bisher_produziert);
            $('#zeit_zyklus').val(data.zeit_zyklus);
            $('#letzte_störung').val(data.letzte_störung);
        } else if(response.anl_ID !== undefined) {
            toastr.error(response.message);
            $('.navigation').attr('data-value', response.anl_ID);
            $('#anlage').val("");
            $('#programm').val("");
            $('#artikel').val("");
            $('#bisher_produziert').val("");
            $('#zeit_zyklus').val("");
            $('#letzte_störung').val("");
        }
    });
}

//adding event listener to navigation buttons
navigationHook.forEach((node, key, value)=>{
    node.addEventListener('click', function(){
        let type = this.getAttribute('event-type');
        let machine_id = $('.navigation').attr('data-value');
        getMachineData(machine_id, type);
    });
});
