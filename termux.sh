## Código creado por Dev-fedexyz, No quites los créditos xd 

#!/data/data/com.termux/files/usr/bin/bash

# Configuración
BOT_DIR="Nagi-Bot"
BOT_REPO="https://github.com/Dev-fedexyz13/$BOT_DIR"
DB_FILE="database.json"

# Estilos
GREEN='\033[32m'
BOLD='\033[1m'
RESET='\033[0m'

# Función para mostrar mensajes
log() {
    echo -e "${BOLD}${GREEN}$1${RESET}"
}

# Función para instalar dependencias
install_dependencies() {
    yarn --ignore-scripts
    npm install
}

# Función para iniciar el bot
start_bot() {
    cd "$BOT_DIR" && npm start
}

# Función para clonar el repositorio
clone_repo() {
    cd "$HOME"
    rm -rf "$BOT_DIR"
    git clone "$BOT_REPO"
}

# Comienza el script
cd "$HOME"

# Si existe el directorio del bot
if [ -d "$BOT_DIR" ]; then
    cd "$BOT_DIR"

    # Si existe el archivo de base de datos
    if [ -e "$DB_FILE" ]; then
        log "Moviendo \"$DB_FILE\" a \"$HOME\" temporalmente."
        mv "$DB_FILE" "$HOME"
    fi

    log "Eliminando directorio existente y clonando repositorio."
    cd "$HOME"
    rm -rf "$BOT_DIR"
    clone_repo
    cd "$BOT_DIR"
    install_dependencies

    # Restaurar base de datos si existe
    if [ -e "$HOME/$DB_FILE" ]; then
        log "Restaurando \"$DB_FILE\" al nuevo directorio."
        mv "$HOME/$DB_FILE" "$BOT_DIR/"
    fi

    log "Iniciando $BOT_DIR..."
    start_bot

else
    log "El directorio \"$BOT_DIR\" no existe. Clonando repositorio."
    clone_repo
    cd "$BOT_DIR"
    install_dependencies

    # Si existe la base de datos en $HOME, moverla
    if [ -e "$HOME/$DB_FILE" ]; then
        log "Detectado \"$DB_FILE\" en \"$HOME\", moviéndolo a \"$BOT_DIR\"."
        mv "$HOME/$DB_FILE" "$BOT_DIR/"
    fi

    log "Iniciando $BOT_DIR..."
    start_bot
fi
