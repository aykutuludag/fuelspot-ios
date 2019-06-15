<template>
	<div class="privacy">
		<div class="shadow navbar">
			<div class="container">
				<p style="margin: auto !important;">
					<router-link class="navbar__brand" to="/">
						FuelSpot
					</router-link>
				</p>
			</div>
		</div>
		<div class="main-wrapper">
			<div class="container wrapper-720">
				<h1 style="text-align: center">Yardım (İstasyon Yöneticisi)</h1>
				<br />
				<h4>
					FuelSpot ücretli mi?
				</h4>
				<li>
					Hayır ve her zaman da öyle kalacaktır.
				</li>
				<br />
				<h4>İstasyon sahibi/yöneticisi olarak ne yapmam gerekiyor?</h4>
				<li>
					Fiyat değişikliği olduğunda panel üzerinden fiyatları
					güncellemek. Fiyatların eski kalması kullanıcıların yakıt
					alırken istasyonunuzu göz ardı etmesine sebep olabilir.
				</li>
				<li>
					İstasyonunuz özelinde bir kampanya düzenliyorsanız bunu
					FuelSpot'a girmek. Böylece çok daha fazla kitleye tamamen
					ücretsiz bir şekilde ulaşabilirsiniz. Dağıtım firması
					çapında uygulanan kampanyalar FuelSpot tarafından
					girilecektir.
				</li>
				<li>
					Opsiyonel: Müşteri yorumlarına cevaplamak. Bu istasyon
					puanınızda yükselişe ve daha fazla müşteri çekmenize
					yardımcı olur.
				</li>
				<br />
				<h4>
					İstasyonumu FuelSpot'a kaydettim fakat kontrol edemiyorum.
				</h4>
				<li>
					Henüz istasyonunuz onaylanmamış demektir. Bir temsilcimiz en
					kısa sürede sizinle iletişime geçecektir.
				</li>
				<br />
				<h4>
					Birden fazla benzin/dizel yakıtı satmaktayım? Hangisinin
					fiyatını gireceğim?
				</h4>
				<li>
					Aynı türden iki farklı yakıt satmaktaysanız (Dizel,
					Euro-Dizel) fiyatı yüksek olanı giriniz. Bu kullanıcıların
					istasyonunuza geldiğinde bir fiyat sürprizi ile karşılaşıp
					deneyimlerinde ve yorumlarında düşüşe sebep olabilir. Çok
					yakında yönetim paneline ikincil yakıtları ve diğer ürünleri
					(AdBlue, yağ katkıları vs..) ekleyeceğiz. Böylece diğer ürün
					satışlarından daha fazla gelir elde edeceksiniz.
				</li>
				<br />
				<h4>
					Uygulamaya yanlış fiyat girdim. Düzeltmeme rağmen istasyon
					detayındaki fiyat geçmişi grafiği bozuk görünüyor.
				</h4>
				<li>
					Fiyatları güncellediğiniz ekrandaki iletişim butonu
					aracılığıyla bizimle iletişime geçiniz. Hatalı veri en kısa
					sürede düzeltilecektir.
				</li>
				<br />
				<h4>
					Birden fazla istasyonum var? Diğer istasyonları nasıl
					kaydebilirim?
				</h4>
				<li>
					Profil > İstasyon ekle butonu aracılığıyla istasyonlarınızı
					kaydedebilirsiniz.
				</li>
				<li>
					Not: İstasyonu kaydedebilmek için istasyon menzilinde (50
					metre) olmalısınız.
				</li>
				<br />
				<h4>
					İstasyonuma küfür/hakaret içeren bir yorum yazılmış.
				</h4>
				<li>
					Fiyatları güncellediğiniz ekrandaki iletişim butonu
					aracılığıyla bizimle iletişime geçiniz. Yorum en kısa sürede
					yorum silinip ilgili kullanıcı sistemden engellenecektir.
				</li>
				<br />
				<h4>
					Tesisler
				</h4>
				<li>
					Tesis bilgilerini sisteme girerek istasyonunuza daha fazla
					müşteri çekebilirsiniz. Birçok insan yakıt almasa dahi
					akaryakıt istasyonlarına çeşitli sebeplerle (WC, Market
					alışverişi, Lastikçi, Oto Yıkama...) gitmektedir.
				</li>
				<br />
				<li>
					WC: İstasyonunuzda ücretsiz tuvalet imkanı var ise
					işaretleyiniz.
				</li>
				<li>
					Market: İstasyonunuzda alışveriş yapılabilir bir market var
					ise işaretleyiniz.
				</li>
				<li>
					Oto Yıkama: İstasyon menzilinde (50 metre) müşterilerin
					aracını kendileri yıkayabileceği ya da yıkatabileceği bir
					Oto Yıkama bölümü var ise işaretleyiniz.
				</li>
				<li>
					Lastikçi: İstasyon menzilinde (50 metre) lastik tamiri ve
					satışı yapılan bir işletme var ise işaretleyiniz.
				</li>
				<li>
					Oto Tamir: İstasyon menzilinde (50 metre) temel oto tamir ve
					bakım hizmetlerinin verildiği bir işletme var ise
					işaretleyiniz.
				</li>
				<li>
					Restoran: İstasyon menzilinde (50 metre) restoran/seyyar
					restoran/fırın gibi hazır gıda ürünlerinin sunulduğu bir
					işletme var ise işaretleyiniz.
				</li>
				<li>
					ParkSpot: İstasyon menzilinde (50 metre) tır veya binek
					araçların park edebileceği bir alan var ise işaretleyiniz.
				</li>
				<li>
					ATM: İstasyon menzilinde (50 metre) ATM veya banka şubesi
					var ise işaretleyiniz.
				</li>
				<li>
					Motel: İstasyon menzilinde (50 metre) hotel/motel/pansiyon
					vb. işletme var ise işaretleyiniz.
				</li>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "HelpForSuperuser",
	metaInfo: {
		title: "Yardım (İstayon Yöneticisi)",
	},
};
</script>
