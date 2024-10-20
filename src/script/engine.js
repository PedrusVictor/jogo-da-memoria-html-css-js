function getRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
const size = 10;

function createCards(number) {

    const table = document.querySelector(".table")
    for (let a = 0; a < number * 2; a++) {
        let cell = table.appendChild(document.createElement("div"))
        cell.classList.add("tableCell")
        cell.id = a
        cell.appendChild(document.createElement("h2"))
    }

}

createCards(size)
const state = {
    view: {
        cells: document.querySelectorAll(".tableCell>h2"),
        leftTime: document.querySelector("#time"),
        Currentlvl: document.querySelector("#lvl"),
        currentScore: document.querySelector("#score"),

        currentId: null,

    },
    values: {
        time: 10,
        lvl: 0,
        score: 0,
        arrayCell: [],
        speedGame: 1000,
        move: false,
        coutdown: 5,

    },
    action: {

        coutdownTime: setInterval(() => {
            if (state.values.time > 0) {
                state.values.time--;
                state.view.leftTime.textContent = state.values.time
            }
            else {

                clearInterval(state.action.coutdownTime);
                console.log("Game Over")

            }
        }, 1000)
    }
}

function embaralhar() {

    for (let a = 0; a < 2; a++) {

        var array = Array.from({ length: size }, (v, k) => k)



        while (array.length > 0) {


            let nSorteado = getRandom(0, array.length - 1)


            var valor = array[nSorteado]



            state.values.arrayCell.push(valor)

            array.splice(nSorteado, 1)


        }



    }




}

function hideShow(id, valor) {

    if (id == null || valor == null) {
        state.view.cells.forEach((e, k) => {
            if (!e.parentElement.classList.contains("flipCell")) {
                e.parentElement.classList.add("flipCell")
                e.textContent = state.values.arrayCell[k]
            }
            else {
                e.parentElement.classList.remove("flipCell")
                e.textContent = ""
            }


        })
    }
    else {
        var element = state.view.cells[id]
        if (!valor && element.parentElement.classList.contains("flipCell")) {
            element.parentElement.classList.remove("flipCell")
            element.textContent = ""
        }
        else {
            element.parentElement.classList.add("flipCell")
            element.textContent = state.values.arrayCell[id]
        }

    }

}

function clickEventListener() {

    state.view.cells.forEach((element) => {


        element.parentElement.addEventListener("mousedown", () => {
            var elem = element.parentElement
            if (state.values.move && !elem.classList.contains("flipCell")) {


                let valorAtual = state.values.arrayCell[elem.id]
                let id = state.values.currentId

                hideShow(elem.id, true)
                if (state.values.currentId == null) {
                    state.values.currentId = elem.id
                    //hideShow(elem.id)
                }

                else if (state.values.currentId !== null && state.values.currentId !== elem.id && valorAtual === state.values.arrayCell[id]) {


                    state.values.score++;
                    state.values.move=false
                    setTimeout(()=>{
                       // state.view.cells[state.values.currentId].parentElement.remove()
                        //elem.remove()

                        state.view.cells[state.values.currentId].parentElement.setAttribute("disabled",true);
                        elem.setAttribute("disabled",true);

                        state.values.currentId = null
                        state.view.currentScore.textContent = state.values.score;
                        state.values.move=true;
                    },250)
                   
                    //hideShow(elem.id)

                }
                else if (state.values.currentId !== elem.id) {
                    state.values.move = false
                    setTimeout(
                        () => {
                            hideShow(elem.id, false);
                            hideShow(state.values.currentId, false);
                            state.values.currentId = null;
                            state.values.move = true

                        }, 1000
                    )



                }
            }




        })
    })

}



function initialize() {

    embaralhar()


    //mostrar cartas
    hideShow();

    const CooldownView = setInterval(
        () => {


            const table = document.querySelector(".table")
            var cd;
            if (!document.querySelector(".coutdown")) {
                cd = table.appendChild(document.createElement("div"))
                cd.classList.add("coutdown")
                cd.appendChild(document.createElement("h2"))

            } else {
                cd = document.querySelector(".coutdown")
            }


            cd.firstChild.textContent = state.values.coutdown;

            if (state.values.coutdown >= 0) {
                state.values.coutdown--
            }
            else {
                clearInterval(CooldownView)
                cd.remove()

                clickEventListener();
                state.values.move = true;
                hideShow()
            }
        }
        , 1000);

    //tempo para visualizar as cartas 5s








    //esconder as cartas para iniciar o jogo
}

initialize()


