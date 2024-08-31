// ==UserScript==
// @name         Hamster Kombat Web
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Запуск Hamster Kombat в браузере
// @author       mudachyo
// @match        *://*.hamsterkombat.io/*
// @match        *://*.hamsterkombatgame.io/*
// @grant        none
// @icon         https://hamsterkombatgame.io/images/icons/hamster-coin.png
// @downloadURL  
// @updateURL    
// @homepage     
// ==/UserScript==

(function() {
    'use strict';


    function getRandomAndroidUserAgent() {
    const androidVersions = [
        "10.0", "11.0", "12.0", "13.0", "14.0"
    ];

    const devices = [
        "Pixel 5", "Pixel 6", "Pixel 7", "Samsung Galaxy S21", "Samsung Galaxy S22",
        "OnePlus 9", "OnePlus 10", "Xiaomi Mi 11", "Huawei P40", "Oppo Find X3"
    ];

    const chromeVersions = [
        "97.0.4692.70", "98.0.4758.102", "99.0.4844.51", "100.0.4896.127"
    ];

    const randomAndroidVersion = androidVersions[Math.floor(Math.random() * androidVersions.length)];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    const randomChromeVersion = chromeVersions[Math.floor(Math.random() * chromeVersions.length)];

    return `Mozilla/5.0 (Linux; Android ${randomAndroidVersion}; ${randomDevice}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomChromeVersion} Mobile Safari/537.36`;
}

    const newUserAgent = getRandomAndroidUserAgent();

    // Функция для замены URL скрипта
    function replaceScriptUrl() {
        // Список URL-адресов для замены
        const urlsToReplace = [
            'https://hamsterkombat.io/js/telegram-web-app.js',
            'https://app.hamsterkombat.io/js/telegram-web-app.js',
            'https://hamsterkombat.io/js/telegram-web-app.js?v=7.6',
            'https://hamsterkombatgame.io/js/telegram-web-app.js?v=7.6'
        ];
        const newUrl = 'https://mudachyo.codes/hamsterkombat/telegram-web-app.js';

        // Получаем все теги <script> на странице
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            // Проверяем, содержит ли src один из URL-адресов для замены
            if (urlsToReplace.includes(script.src)) {
                // Создаем новый тег <script> с новым URL
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                // Заменяем старый тег на новый
                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    Object.defineProperty(navigator, 'userAgent', {
        get: function() { return newUserAgent; }
    });
    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone'; }
    });
    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.'; }
    });
    Object.defineProperty(navigator, 'deviceMemory', {
        get: function() { return undefined; }
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
        get: function() { return 5; }
    });

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
            }
        });
    });

    // Настройки наблюдателя
    const config = {
        childList: true,
        subtree: true
    };

    // Начинаем наблюдение за изменениями в DOM
    observer.observe(document.body, config);

    // Первоначальный запуск замены URL
    replaceScriptUrl();
})();
