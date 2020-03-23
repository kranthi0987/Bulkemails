export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'info',
            },
        },
        {
            title: true,
            name: 'Components',
            wrapper: {
                element: '',
                attributes: {},
            },
        },
        {
            name: 'Whatsapp Message',
            url: '/base',
            icon: 'icon-star',
            children: [
                // {
                //     name: 'Cards',
                //     url: '/base/cards',
                //     icon: 'icon-puzzle',
                // },
                // {
                //     name: 'Forms',
                //     url: '/base/forms',
                //     icon: 'icon-puzzle',
                // },
                {
                    name: 'Message',
                    url: '/base/messages',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Bulk Message',
                    url: '/base/bulkmessages',
                    icon: 'icon-puzzle',
                },
                {
                    name: 'Multimedia Message',
                    url: '/base/multimediamessages',
                    icon: 'icon-puzzle',
                },
                // {
                //     name: 'Collage Message',
                //     url: '/base/collagemediamessages',
                //     icon: 'icon-puzzle',
                // },
                {
                    name: 'List Messages',
                    url: '/base/tables',
                    icon: 'icon-puzzle',
                },
            ],
        },
    ],
};
