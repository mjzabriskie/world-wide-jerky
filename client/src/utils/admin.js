import decode from 'jwt-decode';

class aTrue {
    getToken() {
        //Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    check() {
        const token = this.getToken();
        // use type coersion to check if the token is NOT undefined and the token is NOT expired.
        try {
            const decoded = decode(token)

            if (decoded.data.admin === true) {
                return true;
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default new aTrue();