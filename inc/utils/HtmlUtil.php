<?php

namespace tonopah;

class HtmlUtil {
	static function renderSelectOptions($options, $current=NULL) {
		$res="";

		foreach ( $options as $key => $label ) {
			$res.=sprintf(
				'<option value="%s" %s>%s</option>',
				esc_attr( $key ),
				( ( strval( $current ) === strval( $key ) ) ? 'selected' : '' ),
				esc_html( $label )
			);
		}

		return $res;
	}

	static function displaySelectOptions($options, $current=NULL) {
		echo HtmlUtil::renderSelectOptions($options,$current);
	}

	static function getReqVar( $name, $default = null ) {
		if ( ! isset( $_REQUEST[ $name ] ) ) {
			if ( null !== $default ) {
				return $default;
			}

			throw new Exception( 'Expected request variable: ' . $name );
		}

		return wp_unslash( $_REQUEST[ $name ] );
	}
}
