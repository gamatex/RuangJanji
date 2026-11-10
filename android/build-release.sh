#!/usr/bin/env bash
# ==============================================================================
# Script Otomatis Build Android App Bundle (.aab) untuk Play Console
# ==============================================================================
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=========================================================="
echo "  RuangJanji - Build Release App Bundle (.aab)"
echo "=========================================================="

if [ ! -f "$DIR/keystore.properties" ]; then
    echo "⚠️  Berkas '$DIR/keystore.properties' belum ditemukan."
    echo "   Jalankan './generate-keystore.sh' terlebih dahulu atau salin 'keystore.properties.example'."
    exit 1
fi

echo "Membersihkan build sebelumnya..."
./gradlew clean

echo ""
echo "📦 1. Mem-build Bundle RuangJanji (Mempelai)..."
./gradlew bundleRuangjanjiRelease

echo ""
echo "📦 2. Mem-build Bundle RuangJanji Buku Tamu (Resepsi)..."
./gradlew bundleBukutamuRelease

echo ""
echo "=========================================================="
echo "🎉 Build Berhasil Selesai!"
echo "Berkas .aab siap di-upload ke Google Play Console:"
echo ""
echo "1. APK/AAB RuangJanji (Mempelai):"
echo "   app/build/outputs/bundle/ruangjanjiRelease/app-ruangjanji-release.aab"
echo ""
echo "2. APK/AAB RuangJanji Buku Tamu (Resepsi):"
echo "   app/build/outputs/bundle/bukutamuRelease/app-bukutamu-release.aab"
echo "=========================================================="
