import axios                        from 'axios';
import emailjs                      from '@emailjs/browser';

class EmailProvider {

    /**
     * Send Confirmation Email
     *
     * @param {object} data
     *
     * @return {object}
     */
    static async sendConfirmationEmail(data) {
        return  emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id);
    }
}
export default EmailProvider;
