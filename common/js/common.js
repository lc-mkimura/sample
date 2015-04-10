/* ===================================================================

 * common.js - 共通処理
 *
 * jQuery 2.1.1

======================================================================*/

(function($) {

	var App = {

		gv: {},
		ui: {}

	};
	window.fn = App;


/*--------------------------------------------------------------------
 グローバル変数
----------------------------------------------------------------------*/

	App.gv = {

	};


/*--------------------------------------------------------------------
 UI処理関数
----------------------------------------------------------------------*/

	App.ui = {

		/**
		 * スムーススクロール
		 * param@ targetHref: アンカーパスID
		 */
		smoothScroll: function(targetHref) {

			var href = targetHref;
			var scrollSpeed = 500;

			// 遷移先URLが#のみまたは空であれば先頭に
			var target = $(href === '#' || href === '' ? 'html' : href);
			var position = target.offset().top;

			// スクロール処理
			$('html, body').animate({
				scrollTop: position
			}, scrollSpeed, 'swing');
		},

		/**
		 * 画像マウスオーバー時の画像ファイル名を変換
		 * param@ $targetNode マウスオーバーした要素
		 */
		imageRollover: function($targetNode) {

			var $this = $targetNode;

			// 画像パスを取得して分解、画像ファイル名のみを取得
			var imgSrc = $this.attr('src');
			var imgPath = imgSrc.split('/');
			var imgFile = imgPath[imgPath.length -1];

			// 画像ファイル名に_onがなければ追加、あれば削除
 			var imgReplacedFile = (imgFile.indexOf('_on') == -1) ? imgSrc.replace(/(\.)(gif|jpg|png)/i, '_on$1$2') : imgSrc.replace(/(\_on)(.)(gif|jpg|png)/i, '$2$3');

			// 変換した画像パスをsrc属性に代入
			$this.attr('src', imgReplacedFile);

			return false;
		}

	};


/*--------------------------------------------------------------------
 即時実行処理
----------------------------------------------------------------------*/

	/**
	 * 初期実行処理
	 */
	var init = function() {

		// ★要素指定変数
		var $imageSwap	= $('.btn');		// マウスオーバー対象画像要素

		/** 画像マウスオーバー時の画像ファイル名変換 */
		$imageSwap.hover(function() {
			App.ui.imageRollover($(this));
		}, function() {
			App.ui.imageRollover($(this));
		});

		/** スムーススクロール */
		$('a[href^="#"]').on('click', function() {
			App.ui.smoothScroll($(this).attr('href'));
		});

	};

	/** 初期実行処理 */
	init();

})(jQuery);
