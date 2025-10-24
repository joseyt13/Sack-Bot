import { sendInteractiveMessage} from '@whiskeysockets/baileys';

const handler = async (m, { conn}) => {
  const jid = m.chat;

  await sendInteractiveMessage(conn, jid, {
    text: '🍃 Elige una opción del menú:',
    interactiveButtons: [
      {
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
          title: '🌿 Opciones del Owner',
          sections: [
            {
              title: '🍂 Panel Principal',
              rows: [
                {
                  id: '.estado',
                  title: '📊 Estado del Bot',
                  description: 'Ver estadísticas y actividad'
},
                {
                  id: '.reiniciar',
                  title: '🔄 Reiniciar Bot',
                  description: 'Reinicia el sistema del bot'
},
                {
                  id: '.actualizar',
                  title: '🛠️ Actualizar Código',
                  description: 'Sincroniza con el repositorio'
},
                {
                  id: '.cleartmp',
                  title: '🧹 Limpiar Archivos Temporales',
                  description: 'Elimina archivos innecesarios'
}
              ]
}
          ]
})
}
    ]
});
};

handler.help = ['buttons'];
handler.tags = ['owner'];
handler.command = ['buttons'];
handler.rowner = true;

export default handler;
