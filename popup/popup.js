document.querySelector(".external-button").addEventListener("click", function () {
    chrome.tabs.create({
        url: "https://www.mercadolivre.com.br/cupons/filter?all=true&source_page=int_view_all",
    }, function(tab) {
        // Anexar um depurador à nova aba
        chrome.debugger.attach({tabId: tab.id}, "1.3", function() {
            // Enviar um comando para abrir o DevTools
            chrome.debugger.sendCommand({tabId: tab.id}, "Inspector.show");
        });
    });
});



document.querySelector(".copy-button").addEventListener("click", function () {
    /* Crie um elemento de entrada de texto temporário */
    var myText = `
    function clickButtons() {
        var buttons = document.querySelectorAll(".andes-button.andes-button--small.andes-button--loud");
        for(var i = 0; i < buttons.length; i++){
            if(buttons[i].textContent.trim() === "Aplicar") {
                buttons[i].click();
            }
        }
    }
    function scrollDown() {
        var scrollDuration = 3000;
        var scrollHeight = document.body.scrollHeight;
        var scrollStep = scrollHeight / (scrollDuration / 15);
        var scrollInterval = setInterval(function() {
            if (window.scrollY < scrollHeight - window.innerHeight) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }
    function navigatePage() {
        var nextButton = document.querySelector(".andes-pagination__button--next a");
        if(nextButton) {
            window.location.href = nextButton.href;
        } else {
            window.location.reload();
        }
    }
    clickButtons();
    scrollDown();
    setTimeout(navigatePage, 2600);
    `;
    var tempInput = document.createElement("input");
    tempInput.value = myText;
    document.body.appendChild(tempInput);

    /* Selecione o texto do elemento de entrada de texto */
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* Para dispositivos móveis */

    /* Copie o texto dentro do elemento de entrada de texto */
    document.execCommand("copy");

    /* Remova o elemento de entrada de texto temporário */
    document.body.removeChild(tempInput);
});
