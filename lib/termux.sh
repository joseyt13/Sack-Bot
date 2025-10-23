#!/data/data/com.termux/files/usr/bin/bash
# ===========================================================
#  Código creado por Dev-fedexyz, No quites los créditos xd
# ===========================================================


# Configuración
BOT_DIR="Nagi-Bot"
BOT_REPO="https://github.com/Dev-fedexyz13/$BOT_DIR"
DB_FILE="database.json"

# Estilos
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
CYAN='\033[36m'
BOLD='\033[1m'
RESET='\033[0m'

# Función para mostrar mensajes
log() {
    echo -e "${BOLD}${GREEN}[INFO]${RESET} $1"
}
warn() {
    echo -e "${BOLD}${YELLOW}[WARN]${RESET} $1"
}
error() {
    echo -e "${BOLD}${RED}[ERROR]${RESET} $1"
}

# Función para instalar dependencias
install_dependencies() {
    log "Instalando dependencias con yarn y npm..."
    if command -v yarn &>/dev/null; then
        yarn --ignore-scripts || warn "Fallo parcial en 'yarn' (puede no ser esencial)."
    else
        warn "Yarn no está instalado, omitiendo."
    fi
    npm install || error "Fallo al instalar dependencias con npm." && exit 1
}

# Función para iniciar el bot
start_bot() {
    log "Iniciando el bot..."
    npm start || error "Fallo al iniciar el bot."
}

# Función para clonar el repositorio
clone_repo() {
    cd "$HOME"
    rm -rf "$BOT_DIR"
    log "Clonando repositorio $BOT_REPO"
    git clone --depth=1 "$BOT_REPO" || { error "No se pudo clonar el repositorio."; exit 1; }
}

# Manejar base de datos (backup/restauración)
backup_db() {
    if [ -e "$DB_FILE" ]; then
        log "Moviendo \"$DB_FILE\" a \"$HOME\" temporalmente."
        mv "$DB_FILE" "$HOME"
    fi
}
restore_db() {
    if [ -e "$HOME/$DB_FILE" ]; then
        log "Restaurando \"$DB_FILE\" al nuevo directorio."
        mv "$HOME/$DB_FILE" "$BOT_DIR/"
    fi
}

# Actualizar paquetes de Termux si es primera vez
first_run_setup() {
    log "Actualizando paquetes base de Termux..."
    pkg update -y && pkg upgrade -y
    for pkgname in git nodejs yarn; do
        if ! command -v $pkgname &>/dev/null; then
            log "Instalando $pkgname..."
            pkg install -y $pkgname
        fi
    done
}

# Inicio del script
cd "$HOME"

if [ ! -d "$BOT_DIR" ]; then
    log "El directorio \"$BOT_DIR\" no existe. Clonando repositorio."
    clone_repo
    cd "$BOT_DIR"
    install_dependencies
    restore_db
    start_bot
    exit
fi

cd "$BOT_DIR"
backup_db
cd "$HOME"
clone_repo
cd "$BOT_DIR"
install_dependencies
restore_db
start_bot
