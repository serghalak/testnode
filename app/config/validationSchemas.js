export const AuthValidationSchema = {
    signIn: {
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string',
                //regexp: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/'
            }
        },
        required: ['email', 'password'],
        additionalProperties: false
    }
}