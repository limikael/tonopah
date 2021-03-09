<div class="wrap">
    <h2>Tonopah Settings</h2>

    <form method="post" action="options.php">
        <?php settings_fields( 'tonopah' ); ?>
        <?php do_settings_sections( 'tonopah' ); ?>
        <table class="form-table">
            <tr valign="top">
                <th scope="row">Gameplay Server URL</th>
                <td>
                    <input type="text" name="tonopah_serverurl" 
                        value="<?php echo esc_attr(get_option("tonopah_serverurl")); ?>"
                        class="regular-text"/>
                    <p class="description">Where is the gameplay server?</p>
                </td>
            </tr>

            <tr valign="top">
                <th scope="row">Key</th>
                <td>
                    <input type="text" name="tonopah_key" 
                        value="<?php echo esc_attr(get_option("tonopah_key")); ?>"
                        class="regular-text"/>
                    <p class="description">This key is used to keep server to server communication secure.</p>
                </td>
            </tr>
        </table>

        <?php submit_button(); ?>
    </form>
</div>