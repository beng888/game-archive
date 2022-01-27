export const getImage = (image: string | null, size?: string) => {
    const width = window.innerWidth;

    const resize = {
        games:
            (size === 'small' && width > 768) ||
            size === 'always-small' ||
            (width < 480 && size !== 'always-medium')
                ? 'resize/420/-/'
                : size === 'medium' || size === 'always-medium' || width < 768
                ? 'crop/600/400/'
                : '',
        screenshots:
            (size === 'small' && width > 768) ||
            size === 'always-small' ||
            (width < 480 && size !== 'always-medium')
                ? 'resize/420/-/'
                : size === 'medium' || size === 'always-medium' || width < 768
                ? 'resize/640/-/'
                : '',
    };

    if (image?.includes('media/games'))
        return image.replace('media/games', `media/${resize.games}games`);
    if (image?.includes('media/screenshots'))
        return image.replace(
            'media/screenshots',
            `media/${resize.screenshots}screenshots`
        );
    if (!image) return 'assets/images/no-image.jpg';

    return image;
};

export const getColor = (value: number): string => {
    if (value > 75) return '#5ee432';
    if (value > 50) return '#fffa50';
    if (value > 25) return '#f7aa38';
    if (value > 0) return '#ef4655';
    return 'gray';
};

export const getLoadType = (type: string) => type.split(':')[0];

export const generateYearsBetween = (startYear = 2000, endYear?: any) => {
    const endDate = endYear || new Date().getFullYear();
    let years = [];
    for (var i = startYear; i <= endDate; i++) {
        years.push(startYear);
        startYear++;
    }
    return years;
};
