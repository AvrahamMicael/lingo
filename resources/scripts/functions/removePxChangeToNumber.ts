import replace from 'voca/replace';

const removePxAndChangeToNumber = (string: string): number => Number(replace(string, 'px', ''));

export default removePxAndChangeToNumber;
