/* ===================================================================

 * contents.js - コンテンツページ処理
 *
 * jQuery 2.1.1

======================================================================*/

$(function() {

	var READ_COOKIE = $.cookie('activeTab');

	/**
	 * 実行処理
	 */
	var init = function() {

		notesText();

		/** タブ連動コンテンツ */
		tabContents($('.tabNav'), $('.tabContents'));

		// Cookieを削除
		$('.btnDelete').off('click');
		$('.btnDelete').on('click', function() {
			$.removeCookie('activeTab');
			READ_COOKIE = '';
			notesText();
		});

	};


/*--------------------------------------------------------------------
 実行関数
----------------------------------------------------------------------*/

	/**
	 * 
	 */
	var notesText = function() {
		$('.notes dd').text(READ_COOKIE);
	};

	/**
	 * タブ連動コンテンツ
	 * param@ $nav: タブ要素
	 * param@ $contents: 連動させるコンテンツ要素
	 */
	var tabContents = function($nav, $contents) {

		var $tabNav = $nav;
		var $tabContents = $contents;
		var ACTIVE_CLASS = 'active';

		// タブクリック処理
		$tabNav.find('li a').on('click', function() {

			var $this = $(this);

			READ_COOKIE = $this.attr('href');

			var $target = $(READ_COOKIE);

			// 一度タブのクラスを削除し、コンテンツを非表示
			$tabNav.find('.' + ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
			$tabContents.hide();

			// クリックしたタブにクラスを付与
			$this.parent('li').addClass(ACTIVE_CLASS);
			// 対象のコンテンツを表示
			$target.show();

			// 対象情報をcookieに保存
			$.cookie('activeTab', READ_COOKIE, { expires: 7 });
			notesText();

			return false;
		});

		// 初期表示処理
		if(!$tabNav.find('.' + ACTIVE_CLASS).length) {

			if(READ_COOKIE) {

				// パラメータ値があればパラメータ値と同じ属性値のコンテンツを表示
				$tabNav.find('[href="' + READ_COOKIE + '"]').click();

			} else {
				// パラメータ値がない場合は最初のコンテンツを表示
				$tabNav.find('li:first-child a').click();
			}

		}

	};

	/** 初期処理 */
	init();

});
