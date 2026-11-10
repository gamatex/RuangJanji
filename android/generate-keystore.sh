#!/usr/bin/env bash
# ==============================================================================
# Script Otomatis Pembuatan Release Keystore untuk Google Play Console
# RuangJanji & RuangJanji Buku Tamu
# ==============================================================================
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEYSTORE_FILE="$DIR/release-keystore.jks"
PROPERTIES_FILE="$DIR/keystore.properties"
ALIAS="ruangjanji-key"

echo "=========================================================="
echo "  RuangJanji - Android Keystore Generator"
echo "=========================================================="

if [ -f "$KEYSTORE_FILE" ]; then
    echo "⚠️  File Keystore '$KEYSTORE_FILE' sudah ada."
    read -p "Apakah Anda ingin membuat ulang? Ini akan menimpa keystore lama (y/N): " CONFIRM
    if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
        echo "Dibatalkan. Keystore lama dipertahankan."
        exit 0
    fi
    rm -f "$KEYSTORE_FILE"
fi

# Minta password atau gunakan default jika enter
echo ""
echo "Masukkan password untuk Keystore (minimal 6 karakter):"
read -s -p "Password: " PASSWORD
echo ""

if [ -z "$PASSWORD" ]; then
    echo "Password tidak boleh kosong!"
    exit 1
fi

echo "Membuat release-keystore.jks menggunakan keytool..."
keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE_FILE" \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$PASSWORD" \
    -keypass "$PASSWORD" \
    -dname "CN=RuangJanji, OU=Mobile, O=gamatex, L=Jakarta, ST=DKI, C=ID"

echo ""
echo "Membuat berkas konfigurasi 'keystore.properties'..."
cat << KEOF > "$PROPERTIES_FILE"
storeFile=release-keystore.jks
storePassword=$PASSWORD
keyAlias=$ALIAS
keyPassword=$PASSWORD
KEOF

echo "=========================================================="
echo "✅ Keystore berhasil dibuat:"
echo "   - Keystore: $KEYSTORE_FILE"
echo "   - Properties: $PROPERTIES_FILE"
echo "   - Key Alias: $ALIAS"
echo "=========================================================="
echo "PENTING: Simpan dan cadangkan (backup) file release-keystore.jks di tempat yang aman!"
echo "Jika file ini hilang, Anda tidak akan bisa merilis update aplikasi di Play Store."
