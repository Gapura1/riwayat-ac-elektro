document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const kodeAC = document.getElementById("kodeAC").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>Memuat data...</p>";

    try {
        // Ganti URL dengan URL JSON Anda
        const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrs_b9HxDkCwKRo0alSayDVbr9uWUnCdC4_W2U9tgxefKWw02LdDabZYZMaznx2yNA_6HJ4o9fpDvC/pub?gid=318386204&single=true&output=json';
        const response = await fetch(sheetURL);

        // Cek apakah response valid
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data dari Google Sheets:", data); // Debug

        // Ekstrak data
        const riwayatPerawatan = [];
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            RiwayatPerawatan.push({
                kodeAC: row[0]?.trim().toLowerCase() || "", // Kolom 0: Kode AC
                tanggal: row[1] || "-",
                teknisi: row[2] || "-",
                jenis: row[3] || "-",
                keterangan: row[4] || "-"
            });
        }

        // Filter data
        const filteredData = RiwayatPerawatan.filter(item => 
            item.kodeAC === kodeAC
        );

        // Tampilkan hasil
        if (filteredData.length > 0) {
            // ... (kode untuk tabel)
        } else {
            resultDiv.innerHTML = `<p>Tidak ditemukan riwayat untuk Kode AC: <strong>${kodeAC.toUpperCase()}</strong></p>`;
        }
    } catch (error) {
        console.error("Error:", error); // Debug
        resultDiv.innerHTML = `<p>Gagal memuat data. Error: ${error.message}</p>`;
    }
});