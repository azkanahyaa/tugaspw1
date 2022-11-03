import dataConsole from './json/console.json' assert {type: 'json'};
import dataRuangan from './json/ruangan.json' assert {type: 'json'};
import dataPaket from './json/paket.json' assert {type: 'json'};
import dataSnack from './json/snack.json' assert {type: 'json'};

const renderBtn = () => {
    let inputs = document.querySelectorAll('input')
    let isNotEmpty = []
    inputs.forEach((i) => {
        if (i.value !== "") return isNotEmpty.push(true)
        return isNotEmpty.push(false)
    })

    if (isNotEmpty.every((c) => c)) {
        document.querySelector('button[type="submit"]').disabled = false
    } else {
        document.querySelector('button[type="submit"]').disabled = true

    }
}

window.onload = () => {
    document.getElementById('packet').innerHTML = `
        <option disabled selected="">Pilih Paket Sewa</option>
        ${dataPaket.map((x) => '<option value="'+x.name+'">'+x.name+'</option>\n').join()}
        <option value="CUSTOM">Custom</option>
    `

    dataConsole.forEach((c) => {
        document.querySelector('#console-list .home-row').innerHTML += `
        <div value="${c.name}" class="tap-item-container">
            <span class="tap-item-text"><span>${c.name}</span></span>
        </div>
        `
    })

    const consoleContainers = document.querySelectorAll('#console-list .home-row .tap-item-container')
    consoleContainers.forEach((e) => {
        e.onclick = () => {
            if (!e.classList.contains('disabled')) {
                consoleContainers.forEach(el => el.classList.remove('active'))
                e.classList.add('active')
                document.querySelector("input[name='konsol']").value = e.innerText
                renderBtn()
            }
        }
    })

    dataRuangan.forEach((c) => {
        document.querySelector('#roomtype-list .home-row1').innerHTML += `
        <div value="${c.name}" class="tap-item-container">
            <span class="tap-item-text"><span>${c.name}</span></span>
        </div>
        `
    })


    const roomContainers = document.querySelectorAll('#roomtype-list .home-row1 .tap-item-container')
    roomContainers.forEach((e) => {
        e.onclick = () => {
            if (!e.classList.contains('disabled')) {

                roomContainers.forEach(el => el.classList.remove('active'))
                e.classList.add('active')
                document.querySelector("input[name='room_type']").value = e.getAttribute('value')
                
                document.querySelector('#location-list .home-row2').innerHTML = ''
                dataRuangan.find((i) => i.name === e.getAttribute('value')).locations.forEach((c) => {
                    document.querySelector('#location-list .home-row2').innerHTML += `
                    <div class="tap-item-container ${(c.available) ? '' : 'disabled'}">
                    <span class="tap-item-text"><span>${c.code}</span></span>
                    </div>
                    `
                })
                renderBtn()
            }
            const locationContainers = document.querySelectorAll('#location-list .home-row2 .tap-item-container')
            locationContainers.forEach((e) => {
                e.onclick = () => {
                    if (!e.classList.contains('disabled')) {

                        locationContainers.forEach(el => el.classList.remove('active'))
                        e.classList.add('active')
                        document.querySelector("input[name='location']").value = e.innerText
                        renderBtn()
                    }
                }
            })
        }
    })

    
    Array(1,2,3,4,5,6,7,8).forEach((n) => {
        document.querySelector('#duration .home-row3').innerHTML += `
        <div value=${n} class="tap-item-container">
            <span class="tap-item-text"><span>${n} Jam</span></span>
        </div>
        `
    })

    const durationContainers = document.querySelectorAll('#duration .home-row3 .tap-item-container')
    durationContainers.forEach((e) => {
        if (!e.classList.contains('disabled')) {
            e.onclick = () => {
                durationContainers.forEach(el => el.classList.remove('active'))
                e.classList.add('active')
                document.querySelector("input[name='duration']").value = e.getAttribute("value")
                renderBtn()
            }
        }
    })

    dataSnack.forEach((s) => {
        document.querySelector('#snack-list .home-row').innerHTML += `
        <div value="${s}" class="tap-item-container">
            <span class="tap-item-text"><span>${s}</span></span>
        </div>
        `
    })
    const snackContainers = document.querySelectorAll('#snack-list .home-row .tap-item-container')
    snackContainers.forEach((e) => {
        if (!e.classList.contains('disabled')) {
            e.onclick = () => {
                e.classList.toggle('active')
                const value = []
                snackContainers.forEach(e => {
                    if (e.classList.contains("active")) value.push(e.getAttribute("value"))
                })
                document.querySelector("input[name='snack']").value = value.join(",")
                renderBtn()
            }
        }
    })



    document.querySelectorAll('input').forEach((e) => {
        if (!e.hasAttribute('optional')) e.oninput = renderBtn
    })
}

window.renderDetailInput = () => {
    const detailInput = document.querySelectorAll('.home-input-detail')
    const select = document.querySelector('#packet')
    document.querySelectorAll('input[type="hidden"]').forEach((e) => e.value = '')

    detailInput.forEach(e => e.classList.remove('hidden'))
    if (select.value === "CUSTOM") {
        const tapContainers = document.querySelectorAll('#console-list .tap-item-container, #roomtype-list .tap-item-container, #duration .tap-item-container, #snack-list .tap-item-container')
        tapContainers.forEach((e) => {
            e.classList.remove('disabled')
            e.classList.remove('active')

            document.querySelector('#location-list .home-row2').innerHTML = `
            <div class="tap-item-container disabled">
                <span class="tap-item-text"><span>Pilih jenis ruangan sebelum memilih bangku / ruangan</span></span>
            </div>
                
            `
        })
    } else {
        const value = dataPaket.find((d) => d.name === select.value).value.split('.')

        const consoleContainers = document.querySelectorAll('#console-list .home-row .tap-item-container')
        consoleContainers.forEach((e) => {
            if (e.getAttribute('value') === dataConsole.find(d => d.code === value[0]).name) {
                e.classList.remove('disabled')
                e.classList.add('active')
                document.querySelector("input[name='konsol']").value =  e.innerText
            } else {
                e.classList.add('disabled')
                e.classList.remove('active')
            }
        })
        const roomContainers = document.querySelectorAll('#roomtype-list .home-row1 .tap-item-container')
        roomContainers.forEach((e) => {
            if (e.getAttribute('value') === dataRuangan.find(d => d.code === value[1]).name) {
                e.classList.remove('disabled')
                e.classList.add('active')
                document.querySelector("input[name='room_type']").value =  e.innerText
                
                document.querySelector('#location-list .home-row2').innerHTML = ''
                dataRuangan.find((i) => i.name === e.getAttribute('value')).locations.forEach((c) => {
                    document.querySelector('#location-list .home-row2').innerHTML += `
                    <div class="tap-item-container ${(c.available) ? '' : 'disabled'}">
                        <span class="tap-item-text"><span>${c.code}</span></span>
                    </div>
                    `
                })

                const locationContainers = document.querySelectorAll('#location-list .home-row2 .tap-item-container')
                locationContainers.forEach((e) => {
                    if (!e.classList.contains('disabled')) {
                        e.onclick = () => {
                            locationContainers.forEach(el => el.classList.remove('active'))
                            e.classList.add('active')
                            document.querySelector("input[name='room']").value = e.innerText
                            renderBtn()
                        }
                    }
                })
            } else {
                e.classList.add('disabled')
                e.classList.remove('active')
            }
        })

        const durationContainers = document.querySelectorAll('#duration .home-row3 .tap-item-container')
        durationContainers.forEach((e) => {
            if (e.getAttribute('value') === value[2]) {
                e.classList.remove('disabled')
                e.classList.add('active')
                document.querySelector("input[name='duration']").value = e.getAttribute('value')
            } else {
                e.classList.add('disabled')
                e.classList.remove('active')
            }
        })

        const snackContainers = document.querySelectorAll('#snack-list .home-row .tap-item-container')
        snackContainers.forEach((e) => {
            if (value[3].split(',').find((s) => s === e.getAttribute('value'))) {
                e.classList.remove('disabled')
                e.classList.add('active')
                const snackVal = []
                snackContainers.forEach(e => {
                    if (e.classList.contains("active")) snackVal.push(e.getAttribute("value"))
                })
                document.querySelector("input[name='snack']").value = snackVal.join(",")
            } else {
                e.classList.add('disabled')
                e.classList.remove('active')
            }
        })
    }    
    renderBtn()
}