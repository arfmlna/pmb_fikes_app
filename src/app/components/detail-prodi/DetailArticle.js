export default function DetailArticle() {
    return (
      <article className="bg-white px-6 my-10 md:px-16 py-12 max-w-5xl mx-auto rounded-lg shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Profesi Kebidanan
        </h1>
  
        {/* Tentang Program Studi */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Tentang Program Studi
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Program Studi Profesi Kebidanan adalah lanjutan dari pendidikan sarjana kebidanan yang bertujuan untuk membentuk tenaga bidan profesional. Mahasiswa akan mendapatkan pengalaman klinis mendalam serta pemahaman teoritis yang kuat dalam pelayanan kesehatan ibu dan anak.
          </p>
        </section>
  
        {/* Jalur Pendaftaran */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Jalur Pendaftaran
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Calon mahasiswa dapat mendaftar melalui beberapa jalur seperti Seleksi Nasional Masuk Perguruan Tinggi Negeri (SNMPTN), Seleksi Bersama Masuk Perguruan Tinggi Negeri (SBMPTN), maupun jalur mandiri di masing-masing institusi pendidikan.
          </p>
        </section>
  
        {/* Prospek Karir */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Prospek Karir
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lulusan program profesi kebidanan dapat bekerja sebagai bidan profesional di rumah sakit, puskesmas, klinik, maupun membuka praktik mandiri. Selain itu, mereka juga berpeluang berkarir sebagai tenaga pengajar, peneliti, atau berkontribusi dalam organisasi kesehatan.
          </p>
        </section>
  
        {/* Materi */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Materi yang Dipelajari
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Asuhan kebidanan pada kehamilan, persalinan, nifas, dan bayi baru lahir</li>
            <li>Kebidanan komunitas dan pelayanan kesehatan reproduksi</li>
            <li>Etika dan hukum dalam praktik kebidanan</li>
            <li>Manajemen kebidanan dan praktik klinik profesional</li>
          </ul>
        </section>
  
        {/* Button */}
        <div className="text-center mt-12">
          <a
            href="/daftar"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Daftar Sekarang
          </a>
        </div>
      </article>
    );
  }
  