function create_datatable(datset,target){
    columns = [];
    for (key in dataset[0]){
        columns.push({'title':key, 'data':key});
    }
        $(target).DataTable( {
        data: dataset,
        dom: 'Bfrtip',
        colReorder: true,
        responsive: true,
       buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
        columns: columns
    } );
}

