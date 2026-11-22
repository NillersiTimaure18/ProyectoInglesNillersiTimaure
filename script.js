let agentName = "Nova";
let stability = 100;
let currentScene = 0;

// Guion de la historia con mensajes de error bilingües
const storyScenes = [
    {
        chapter: "CHAPTER 02 // ANCIENT EGYPT ANOMALY",
        visual: "🏜️",
        text: () => `Alert, Agent <strong>${agentName}</strong>! Yesterday, a rogue traveler <strong>visited</strong> Ancient Egypt. He <strong>left</strong> a modern smartphone inside a pyramid, and the Pharaoh <strong>found</strong> it!`,
        prompt: "How do you report and fix the situation in your log?",
        choices: [
            {
                text: "A) 'I travel to Egypt yesterday and take the phone.'",
                correct: false,
                feedback: "⚠️ Temporal glitch! That happened in the past. Use the correct past forms!<br><small style='color: #ffd3e6;'>(¡Glorietas temporales! Eso pasó en el pasado. ¡Usa las formas correctas de pasado!)</small>"
            },
            {
                text: "B) 'I traveled to Egypt, recovered the phone, and erased the Pharaoh's memory.'",
                correct: true,
                feedback: "✅ Timeline restored! Great past report, Agent.<br><small style='color: #a0e7e5;'>(¡Línea temporal restaurada! Gran reporte en pasado, Agente.)</small>"
            },
            {
                text: "C) 'The Pharaoh finded the phone and keeped it.'",
                correct: false,
                feedback: "⚠️ Sensor error! Check those irregular actions in the past.<br><small style='color: #ffd3e6;'>(¡Error de sensores! Revisa esas acciones irregulares en el pasado.)</small>"
            }
        ]
    },
    {
        chapter: "CHAPTER 03 // THE HIGH-SECURITY VAULT",
        visual: "🔐",
        text: () => `Good job! Now you are inside the Chrono-Vault. Look at the security screen: <em>'The Time Crystal <strong>is protected</strong> by laser beams. Only authorized agents <strong>are allowed</strong> inside. Last year, the vault <strong>was upgraded</strong> by top engineers.'</em>`,
        prompt: "A laser alarm suddenly activates! Follow the voice command: <strong>'Do not move! Select the correct security status!'</strong>",
        choices: [
            {
                text: "A) 'The lasers were deactivated by my voice code.'",
                correct: true,
                feedback: "✅ Access granted! The security system recognized the protocol.<br><small style='color: #a0e7e5;'>(¡Acceso concedido! El sistema de seguridad reconoció el protocolo.)</small>"
            },
            {
                text: "B) 'The lasers deactivates by my voice code.'",
                correct: false,
                feedback: "⚠️ Alarm triggered! The system didn't understand that structure.<br><small style='color: #ffd3e6;'>(¡Alarma activada! El sistema no entendió esa estructura.)</small>"
            },
            {
                text: "C) 'Touch the crystal immediately!'",
                correct: false,
                feedback: "⚠️ You ignored the 'Do not move' command! Stability dropped.<br><small style='color: #ffd3e6;'>(¡Ignoraste la orden de 'No te muevas'! La estabilidad bajó.)</small>"
            }
        ]
    },
    {
        chapter: "CHAPTER 04 // THE YEAR 3050 PORTAL",
        visual: "🚀",
        text: () => `You hold the Time Crystal! The Chrono-Radar shows a rift opening in the year 3050. Our team already has a confirmed plan: we <strong>are going to travel</strong> there in 5 minutes to seal it.`,
        prompt: "Before jumping into the portal, what is your prediction for the mission?",
        choices: [
            {
                text: "A) 'I am sure we will seal the rift and the future will be safe!'",
                correct: true,
                feedback: "✅ Confidence locked in! Jumping to 3050...<br><small style='color: #a0e7e5;'>(¡Confianza asegurada! Saltando al 3050...)</small>"
            },
            {
                text: "B) 'We going to sealing the rift yesterday.'",
                correct: false,
                feedback: "⚠️ Coordinates invalid! Mix-up between past and future plans.<br><small style='color: #ffd3e6;'>(¡Coordenadas inválidas! Confusión entre planes pasados y futuros.)</small>"
            },
            {
                text: "C) 'Press the red self-destruct button!'",
                correct: false,
                feedback: "⚠️ Never press the red button during a jump!<br><small style='color: #ffd3e6;'>(¡Nunca presiones el botón rojo durante un salto!)</small>"
            }
        ]
    }
];

function startStory() {
    const input = document.getElementById('agent-name-input').value.trim();
    if (input !== "") {
        agentName = input;
    }
    document.getElementById('hud-agent').innerText = `AGENT: ${agentName.toUpperCase()}`;
    document.getElementById('name-input-area').style.display = 'none';
    document.getElementById('choices-container').style.display = 'flex';
    
    loadScene(0);
}

function loadScene(index) {
    const feedback = document.getElementById('feedback-banner');
    feedback.style.display = 'none';

    if (index >= storyScenes.length) {
        showEnding();
        return;
    }

    const scene = storyScenes[index];
    document.getElementById('chapter-tag').innerText = scene.chapter;
    document.getElementById('scene-visual').innerText = scene.visual;
    document.getElementById('story-text').innerHTML = scene.text();
    document.getElementById('story-prompt').innerHTML = scene.prompt;

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        btn.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(btn);
    });
}

function handleChoice(choice) {
    const feedback = document.getElementById('feedback-banner');
    feedback.style.display = 'block';
    feedback.innerHTML = choice.feedback; // Usamos innerHTML para que reconozca el <small> y <br>

    if (choice.correct) {
        feedback.style.background = 'rgba(160, 231, 229, 0.2)';
        feedback.style.color = '#a0e7e5';
        feedback.style.border = '1px solid #a0e7e5';
        
        setTimeout(() => {
            currentScene++;
            loadScene(currentScene);
        }, 2200); // Un poquito más de tiempo para que alcancen a leer el texto en ambos idiomas
    } else {
        feedback.style.background = 'rgba(255, 118, 117, 0.2)';
        feedback.style.color = '#ff7675';
        feedback.style.border = '1px solid #ff7675';
        
        stability = Math.max(20, stability - 20);
        document.getElementById('stability-fill').style.width = stability + '%';
        document.getElementById('stability-text').innerText = stability + '%';
    }
}

function showEnding() {
    document.getElementById('chapter-tag').innerText = "MISSION ACCOMPLISHED // RANK: MASTER AGENT";
    document.getElementById('scene-visual').innerText = "🏆";
    document.getElementById('story-text').innerHTML = `
        Congratulations, <strong>${agentName}</strong>! The rift in 3050 <strong>was sealed</strong> successfully. 
        History <strong>is</strong> safe once again, and the agency <strong>is going to give</strong> you a promotion tomorrow!
    `;
    document.getElementById('story-prompt').innerHTML = `Final Timeline Stability: <strong>${stability}%</strong>. <strong>Click</strong> below if you want to replay the mission!`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = `
        <button class="choice-btn primary" onclick="location.reload()">PLAY AGAIN</button>
    `;
}