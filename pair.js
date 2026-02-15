const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    delay, 
    Browsers, 
    makeCacheableSignalKeyStore 
} = require('@whiskeysockets/baileys');

const { upload } = require('./catbox');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function ANJA_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            const items = ["Safari", "Chrome", "Firefox"];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });
            
            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) await res.send({ code });
            }
            
            sock.ev.on('creds.update', saveCreds);
            
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(3000);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    function generateANJA_ID() {
                        const prefix = "ANJA";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let silaID = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            silaID += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        return ANJAID;
                    }
                    
                    const silaID = generateANJA_ID();

                    try {
                        // Upload to catbox.moe
                        const catbox_url = await upload(rf, `${sock.user.id}.json`);
                        // Extract filename from catbox URL
                        const catbox_filename = catbox_url.replace('https://catbox.moe/', '');
                        let session_code = "ANJA-MD~" + catbox_filename;
                        
                        let code = await sock.sendMessage(sock.user.id, { text: session_code });
                        
                        // ===== Message with BOX =====
                        let desc =`┏━❑ *ANJA-MD SESSION* ✅
┏━❑ *SAFETY RULES* ━━━━━━━━━
┃ 🔹 *Session ID:* Sent above.
┃ 🔹 *Warning:* Do not share this code!.
┃ 🔹 Keep this code safe.
┃ 🔹 Valid for 24 hours only.
┗━━━━━━━━━━━━━━━
┏━❑ *CHANNEL* ━━━━━━━━━
┃ 📢 Follow our channel: https://whatsapp.com/channel/0029VbCCywJ60eBYAkQ6Nh17
┗━━━━━━━━━━━━━━━
┏━❑ *REPOSITORY* ━━━━━━━━━
┃ 💻 Repository: https://github.com/anjamd0111/ANJA-MD
┃ 👉 Fork & contribute!
┗━━━━━━━━━━━━━━━

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐀𝐧𝐣𝐚𝐧 𝐓𝐞𝐜𝐡`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: 'ANJA MD',
                                    body: '© Anjan Tech',
                                    thumbnailUrl: 'https://files.catbox.moe/mb8wyl.png',
                                    thumbnailWidth: 64,
                                    thumbnailHeight: 64,
                                    sourceUrl: 'https://whatsapp.com/channel/0029VbCCywJ60eBYAkQ6Nh17',
                                    mediaUrl: 'https://files.catbox.moe/mb8wyl.png',
                                    showAdAttribution: true,
                                    renderLargerThumbnail: false,
                                    previewType: 'PHOTO',
                                    mediaType: 1
                                },
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '1203634089913@newsletter',
                                    newsletterName: '© Anjan Tech',
                                    serverMessageId: Math.floor(Math.random() * 1000000)
                                },
                                isForwarded: true,
                                forwardingScore: 999
                            }
                        }, { quoted: code });

                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                        
                        let desc = `┏━❑ *ANJA-MD SESSION* ⚠️
┏━❑ *SAFETY RULES* ━━━━━━━━━
┃ 🔹 *Session ID:* Sent above.
┃ 🔹 *Error:* Session created with minor issues.
┃ 🔹 Keep this code safe.
┃ 🔹 Valid for 24 hours only.
┗━━━━━━━━━━━━━━━
┏━❑ *CHANNEL* ━━━━━━━━━
┃ 📢 Follow our channel: https://whatsapp.com/channel/0029VbCCywJ60eBYAkQ6Nh17
┗━━━━━━━━━━━━━━━
┏━❑ *REPOSITORY* ━━━━━━━━━
┃ 💻 Repository: https://github.com/anjamd0111/ANJA-MD
┃ 👉 Fork & contribute!
┗━━━━━━━━━━━━━━━

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐀𝐧𝐣𝐚𝐧 𝐓𝐞𝐜𝐡`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: 'ANJA MD',
                                    body: '© Anjan Tech',
                                    thumbnailUrl: 'https://files.catbox.moe/mb8wyl.png',
                                    thumbnailWidth: 64,
                                    thumbnailHeight: 64,
                                    sourceUrl: 'https://whatsapp.com/channel/0029VbCCywJ60eBYAkQ6Nh17',
                                    mediaUrl: 'https://files.catbox.moe/mb8wyl.png',
                                    showAdAttribution: true,
                                    renderLargerThumbnail: false,
                                    previewType: 'PHOTO',
                                    mediaType: 1
                                },
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '12002325089913@newsletter',
                                    newsletterName: '© Anjan Tech',
                                    serverMessageId: Math.floor(Math.random() * 1000000)
                                },
                                isForwarded: true,
                                forwardingScore: 999
                            }
                        }, { quoted: ddd });
                    }

                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 🔥 ANJA-MD Session Connected ✅`);
                    await delay(10);
                    process.exit();

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    SILA_MD_PAIR_CODE();
                }
            });
            
        } catch (err) {
            console.log("⚠️ ANJA-MD Connection failed — Restarting service...");
            await removeFile('./temp/' + id);
            if (!res.headersSent) await res.send({ code: "❗ ANJA-MD Service Unavailable" });
        }
    }

    return await ANJA_MD_PAIR_CODE();
});

module.exports = router;
