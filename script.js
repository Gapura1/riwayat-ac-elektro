document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const kodeAC = document.getElementById("kodeAC").value.trim().toLowerCase(); // Case-insensitive
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>Memuat data...</p>";

    try {
        // Ganti URL dengan URL JSON dari Google Sheets Anda
        const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrs_b9HxDkCwKRo0alSayDVbr9uWUnCdC4_W2U9tgxefKWw02LdDabZYZMaznx2yNA_6HJ4o9fpDvC/pub?gid=318386204&single=true&output=json';
        const response = await fetch(sheetURL);
        const data = await response.json();

        // Ambil data dari sheet "RiwayatPerawatan"
        const riwayatPerawatan = [];
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            RiwayatPerawatan.push({
                kodeAC: row[0].trim().toLowerCase(), // Kolom 0: Kode AC
                tanggal: row[1],                     // Kolom 1: Tanggal
                teknisi: row[2],                     // Kolom 2: Teknisi
                jenis: row[3],                       // Kolom 3: Jenis Perawatan
                keterangan: row[4]                   // Kolom 4: Keterangan
            });
        }

        // Filter data (case-insensitive)
        const filteredData = riwayatPerawatan.filter(item => 
            item.kodeAC === kodeAC
        );

        // Tampilkan hasil
        if (filteredData.length > 0) {
            const lastSixEntries = filteredData.slice(-6);
            let html = `
                <h2>Riwayat Perawatan untuk ${kodeAC.toUpperCase()}:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Teknisi</th>
                            <th>Jenis Perawatan</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            lastSixEntries.forEach(entry => {
                html += `
                    <tr>
                        <td>${entry.tanggal}</td>
                        <td>${entry.teknisi}</td>
                        <td>${entry.jenis}</td>
                        <td>${entry.keterangan}</td>
                    </tr>
                `;
            });

            html += `</tbody></table>`;
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p>Tidak ditemukan riwayat untuk Kode AC: <strong>${kodeAC.toUpperCase()}</strong></p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Gagal memuat data. Error: ${error.message}</p>`;
    }
});