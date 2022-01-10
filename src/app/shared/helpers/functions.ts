export const getImage = (image: string, size?: string) => {
    if (image) {
        if (size === 'small') {
            if (image.includes('media/games'))
                return image.replace('media/games', 'media/resize/420/-/games');
            if (image.includes('media/screenshots'))
                return image.replace(
                    'media/screenshots',
                    'media/resize/420/-/screenshots'
                );
            return image;
        }
        if (image.includes('media/games'))
            return image.replace('media/games', 'media/crop/600/400/games');
        if (image.includes('media/screenshots'))
            return image.replace(
                'media/screenshots',
                'media/resize/640/-/screenshots'
            );
        return image;
    }
    return 'assets/images/no-image.jpg';
};

export const getColor = (value: number): string => {
    if (value > 75) return '#5ee432';
    if (value > 50) return '#fffa50';
    if (value > 30) return '#f7aa38';
    if (value > 0) return '#ef4655';
    return 'gray';
};
