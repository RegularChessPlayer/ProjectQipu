def format_real(number_ext):
    if number_ext == 'um':
        return '{} {}'.format(number_ext, 'real')
    else:
        return '{} {}'.format(number_ext, 'reais')

def format_centavo(number_ext):
    if number_ext == 'um':
        return '{} {}'.format(number_ext, 'centavo')
    else:
        return '{} {}'.format(number_ext, 'centavos')



