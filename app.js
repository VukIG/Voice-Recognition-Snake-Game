console.log('helloworld');


// MODEL

let matrix = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];






// VIEW
const renderAll = () => {
    // pravimo template
    let template = '<div class="matrix">';
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        template += '<div class="row">'
        for (let ii = 0; ii < row.length; ii++) {
            const element = row[ii];
            template += '<div class="square ';
            // console.log(element)
            if (element > 0) {
                template += 'green';
            } else {
                template += 'black';
            }
            template += '"></div>';
        }
        template += '</div>';
    }
    template += '</div>';
    // iscrtavanje templatea na ekranu
    const ekran = document.getElementById('ekran');
    ekran.innerHTML = template;
};


// START SCRIPT
renderAll();