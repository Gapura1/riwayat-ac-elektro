document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const kodeAC = document.getElementById("kodeAC").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>Memuat data...</p>";

    try {
        // Ambil data dari URL JSON
        const response = await fetch("https://raw.githubusercontent.com/Gapura1/riwayat-ac-elektro/refs/heads/main/riwayat_perawatan.json");
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const data = await response.json();
        console.log("Data dari GitHub:", data);

        // Pastikan kita mengambil array yang ada di dalam kunci "RiwayatPerawatan"
        if (!data.RiwayatPerawatan || !Array.isArray(data.RiwayatPerawatan)) {
            throw new Error("Format data tidak valid. Harus berupa array dalam 'RiwayatPerawatan'.");
        }

        const perawatanArray = data.RiwayatPerawatan;

        // Filter data berdasarkan Kode AC (case-insensitive)
        const filteredData = perawatanArray.filter(item => 
            item["Kode AC"].toLowerCase() === kodeAC
        );

        if (filteredData.length > 0) {
            // Ambil 6 riwayat terakhir
            const lastSixEntries = filteredData.slice(-6);

            // Buat tabel
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
                        <td>${entry.Tanggal}</td>
                        <td>${entry.Teknisi}</td>
                        <td>${entry["Jenis Perawatan"]}</td>
                        <td>${entry.Keterangan}</td>
                    </tr>
                `;
            });

            html += `</tbody></table>`;
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p>Tidak ditemukan riwayat untuk Kode AC: <strong>${kodeAC.toUpperCase()}</strong></p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
});
