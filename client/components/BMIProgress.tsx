export default function BMIProgress({bmi}:{bmi:number}) {
    function getColor(bmi: number) {
    if (bmi <= 16) return '#ef4444';
    if (bmi > 16 && bmi <= 17) return '#fca5a5';
    if(bmi > 17 && bmi <= 18.5) return '#eab308';
    if(bmi > 18.5 && bmi <= 24.9) return '#22c55e';
    if(bmi > 24.9 && bmi <= 29.9) return '#eab308';
    if (bmi > 29.9) return '#ef4444';
    }
  return (
    <svg
      width="200"
      height="200"
      viewBox="-25 -25 250 250"
      version="1.1"
      className="w-full mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      style={{transform:'rotate(-90deg)'}}
    >
      <circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth="15"
        strokeDasharray="565.48px"
        strokeDashoffset="0"
      ></circle>
      <circle
        r="90"
        cx="100"
        cy="100"
        stroke={getColor(bmi)}
        strokeWidth="20"
        stroke-linecap="round"
        strokeDashoffset={`${Math.max(0, 560 - 560 * bmi/40)}px`}
        fill="transparent"
        strokeDasharray="565.48px"
      ></circle>
      <text
        x="45px"
        y="115px"
        fill={getColor(bmi)}
        fontSize="40px"
        fontWeight="bold"
        style={{transform:'rotate(90deg) translate(0px, -196px)'}}
      >
        {(Math.round(bmi * 100) / 100).toFixed(2)}
      </text>
    </svg>
  );
}
