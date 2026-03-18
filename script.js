// Configurações iniciais dos parâmetros da estufa
let growth = 0;
let humidity = 65;
let temp = 22;
let health = "Excelente";

// Referências aos elementos do DOM
const growthEl = document.getElementById('growth');
const humidityEl = document.getElementById('humidity');
const tempEl = document.getElementById('temp');
const healthEl = document.getElementById('health');
const iconEl = document.getElementById('cabbage-icon');
const msgEl = document.getElementById('msg');

/**
 * Atualiza a interface visual com os valores atuais
 */
function updateDisplay() {
    // Atualiza os textos
    growthEl.innerText = `${growth}%`;
    humidityEl.innerText = `${humidity}%`;
    tempEl.innerText = `${temp}°C`;
    healthEl.innerText = health;

    // Lógica de evolução do ícone (Visual)
    if (growth === 0) {
        iconEl.innerText = "🌱";
    } else if (growth > 0 && growth <= 30) {
        iconEl.innerText = "🌿";
    } else if (growth > 30 && growth <= 70) {
        iconEl.innerText = "☘️";
    } else if (growth > 70 && growth < 100) {
        iconEl.innerText = "🥬";
    } else if (growth >= 100) {
        iconEl.innerText = "🥗";
        msgEl.innerText = "O repolho está pronto para ser colhido!";
        msgEl.style.color = "#2d5a27";
        msgEl.style.fontWeight = "bold";
    }

    // Lógica de Saúde baseada na umidade
    if (humidity < 40 || humidity > 85) {
        health = "Crítica";
        healthEl.style.color = "red";
    } else {
        health = "Excelente";
        healthEl.style.color = "black";
    }
}

/**
 * Função para simular a rega
 */
function waterCabbage() {
    if (growth < 100) {
        humidity = Math.min(humidity + 15, 100); // Aumenta umidade até o limite de 100
        growth = Math.min(growth + 5, 100);      // Cada rega ajuda no crescimento
        msgEl.innerText = "Você regou a plantação!";
        updateDisplay();
    } else {
        msgEl.innerText = "O ciclo já foi concluído.";
    }
}

/**
 * Simula a alteração climática ou ajuste de termostato
 */
function adjustTemp() {
    // Gera uma temperatura aleatória entre 18 e 30 graus
    temp = Math.floor(Math.random() * (30 - 18 + 1)) + 18;
    msgEl.innerText = "Sistema de ventilação acionado.";
    updateDisplay();
}

/**
 * Loop de simulação em "tempo real"
 * A umidade cai naturalmente e o crescimento ocorre se as condições forem boas
 */
setInterval(() => {
    if (growth > 0 && growth < 100) {
        // A umidade cai 1% a cada 3 segundos
        humidity = Math.max(humidity - 1, 0);
        
        // Se a umidade estiver boa (entre 50 e 80), cresce sozinho devagar
        if (humidity > 50 && humidity < 80) {
            growth = Math.min(growth + 1, 100);
        }
        
        updateDisplay();
    }
}, 3000);

// Inicializa a tela
updateDisplay();