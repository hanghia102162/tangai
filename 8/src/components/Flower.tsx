import { motion } from "framer-motion";

type FlowerProps = {
  stage: "intro" | "seed" | "bloom" | "ready" | "message" | "final";
  touched: boolean;
};

const outerAngles = [-135, -90, -45, 0, 45, 90, 135, 180];
const midAngles = [-157.5, -112.5, -67.5, -22.5, 22.5, 67.5, 112.5, 157.5];
const innerAngles = [-150, -90, -30, 30, 90, 150];
const stamenPoints = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export function Flower({ stage, touched }: FlowerProps) {
  const isGrowing = stage !== "intro";
  const isBlooming = stage === "bloom" || stage === "ready" || stage === "message" || stage === "final";
  const isReady = stage === "ready" || stage === "message" || stage === "final";

  return (
    <motion.div
      className="flower-wrap relative h-[430px] w-[310px] sm:h-[530px] sm:w-[390px]"
      animate={
        touched
          ? { rotate: [0, -3, 3, -1.5, 0], scale: [1, 1.04, 1] }
          : isReady
            ? { y: [0, -4, 0] }
            : {}
      }
      transition={
        touched
          ? { duration: 1.2, ease: "easeInOut" }
          : { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg
        viewBox="0 0 390 530"
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label="Một bông hoa đang nở rộ tuyệt đẹp"
      >
        <defs>
          {/* Gradients cho thân cành */}
          <linearGradient id="stemGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1e4634" />
            <stop offset="45%" stopColor="#3d8b63" />
            <stop offset="100%" stopColor="#76cb9b" />
          </linearGradient>

          {/* Gradients cho lá */}
          <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#baf3cc" />
            <stop offset="50%" stopColor="#5bb883" />
            <stop offset="100%" stopColor="#2e6d4c" />
          </linearGradient>

          {/* Gradients cho đài hoa */}
          <linearGradient id="calyxGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ebb86" />
            <stop offset="100%" stopColor="#23583c" />
          </linearGradient>

          {/* Gradients cánh hoa ngoài: hồng nhung ruby sang hồng phấn */}
          <radialGradient id="petalGradOuter" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff2f5" />
            <stop offset="28%" stopColor="#ffb3c4" />
            <stop offset="68%" stopColor="#fb6f92" />
            <stop offset="100%" stopColor="#a7153b" />
          </radialGradient>

          {/* Gradients cánh hoa giữa: chuyển màu tươi tắn mềm mại */}
          <radialGradient id="petalGradMid" cx="50%" cy="26%" r="74%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="32%" stopColor="#ffd0db" />
            <stop offset="72%" stopColor="#ff758f" />
            <stop offset="100%" stopColor="#901132" />
          </radialGradient>

          {/* Gradients cánh hoa trong: lõi hoa ấm áp */}
          <radialGradient id="petalGradInner" cx="50%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#fff5f7" />
            <stop offset="40%" stopColor="#ffa5b6" />
            <stop offset="80%" stopColor="#e63968" />
            <stop offset="100%" stopColor="#740924" />
          </radialGradient>

          {/* Hào quang nhụy hoa phát sáng */}
          <radialGradient id="stamenAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9db" stopOpacity="1" />
            <stop offset="35%" stopColor="#fde047" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Bộ lọc ánh sáng dịu nhẹ */}
          <filter id="flowerGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="seedGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bóng nền mặt đất */}
        <motion.ellipse
          cx="195"
          cy="462"
          rx="72"
          ry="11"
          fill="#0c0512"
          opacity="0.55"
          initial={{ scaleX: 0.2, opacity: 0 }}
          animate={{ scaleX: isGrowing ? 1 : 0.2, opacity: isGrowing ? 0.55 : 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {/* Hạt mầm phát sáng trên mặt đất */}
        <g filter="url(#seedGlow)">
          <motion.circle
            cx="195"
            cy="458"
            r="8"
            fill="#ffccd5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isGrowing ? [0, 1.3, 1] : 0,
              opacity: isGrowing ? [0, 1, 0.7] : 0,
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <motion.circle
            cx="195"
            cy="458"
            r="4"
            fill="#ffffff"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isGrowing ? [0, 1.2, 0.9] : 0,
              opacity: isGrowing ? [0, 1, 0.9] : 0,
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </g>

        {/* Thân cành hoa vươn cao */}
        <motion.path
          d="M 195 458 C 190 395 204 325 196 260 C 192 225 197 198 198 178"
          fill="none"
          stroke="url(#stemGradient)"
          strokeLinecap="round"
          strokeWidth="6.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Lá trái - vươn ra từ thân tại (195, 335) */}
        <g transform="translate(195, 335)">
          <motion.path
            d="M 0 0 C -38 -10 -75 -6 -98 18 C -70 30 -32 20 0 0 Z"
            fill="url(#leafGradient)"
            opacity="0.95"
            initial={{ scale: 0, opacity: 0, rotate: 15 }}
            animate={{
              scale: isGrowing ? 1 : 0,
              opacity: isGrowing ? 0.95 : 0,
              rotate: isGrowing ? 0 : 15,
            }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
            style={{ originX: 1, originY: 0 }}
          />
          <motion.path
            d="M 0 0 C -36 5 -68 12 -98 18"
            fill="none"
            stroke="#d8f8e1"
            strokeWidth="1.2"
            opacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isGrowing ? 1 : 0, opacity: isGrowing ? 0.65 : 0 }}
            transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
          />
        </g>

        {/* Lá phải - vươn ra từ thân tại (197, 275) */}
        <g transform="translate(197, 275)">
          <motion.path
            d="M 0 0 C 38 -10 75 -6 98 16 C 70 28 32 18 0 0 Z"
            fill="url(#leafGradient)"
            opacity="0.95"
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{
              scale: isGrowing ? 1 : 0,
              opacity: isGrowing ? 0.95 : 0,
              rotate: isGrowing ? 0 : -15,
            }}
            transition={{ delay: 1.7, duration: 1.2, ease: "easeOut" }}
            style={{ originX: 0, originY: 0 }}
          />
          <motion.path
            d="M 0 0 C 36 4 68 10 98 16"
            fill="none"
            stroke="#d8f8e1"
            strokeWidth="1.2"
            opacity="0.65"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isGrowing ? 1 : 0, opacity: isGrowing ? 0.65 : 0 }}
            transition={{ delay: 1.9, duration: 1.0, ease: "easeOut" }}
          />
        </g>

        {/* Cụm bông hoa: Tâm đặt chính xác tại (198, 175) */}
        <g transform="translate(198, 175)">
          {/* Đài hoa ôm cuống hoa */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0 }}
            transition={{ delay: 2.1, duration: 0.9, ease: "easeOut" }}
          >
            <path d="M 0 8 C -14 20 -22 30 -32 24 C -20 15 -8 8 0 4 Z" fill="url(#calyxGradient)" />
            <path d="M 0 8 C 14 20 22 30 32 24 C 20 15 8 8 0 4 Z" fill="url(#calyxGradient)" />
            <path d="M 0 6 C -6 22 -6 32 0 38 C 6 32 6 22 0 6 Z" fill="#2d6d4a" />
          </motion.g>

          {/* Các tầng cánh hoa với hiệu ứng phát sáng */}
          <motion.g
            filter="url(#flowerGlow)"
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{
              scale: isBlooming ? 1 : 0.15,
              opacity: isBlooming ? 1 : 0,
            }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Lớp cánh ngoài (8 cánh fanning đều 360 độ quanh tâm) */}
            {outerAngles.map((angle, index) => (
              <g key={`outer-${angle}`} transform={`rotate(${angle})`}>
                <motion.path
                  d="M 0,0 C -34,-24 -50,-62 -26,-92 C -11,-108 11,-108 26,-92 C 50,-62 34,-24 0,0 Z"
                  fill="url(#petalGradOuter)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isBlooming ? 1 : 0,
                    opacity: isBlooming ? 0.98 : 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.06,
                    duration: 1.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: 0.5, originY: 1 }}
                />
              </g>
            ))}

            {/* Lớp cánh giữa (8 cánh so le tạo độ dày và chiều sâu) */}
            {midAngles.map((angle, index) => (
              <g key={`mid-${angle}`} transform={`rotate(${angle})`}>
                <motion.path
                  d="M 0,0 C -26,-18 -38,-48 -20,-72 C -8,-84 8,-84 20,-72 C 38,-48 26,-18 0,0 Z"
                  fill="url(#petalGradMid)"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="0.7"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isBlooming ? 1 : 0,
                    opacity: isBlooming ? 0.98 : 0,
                  }}
                  transition={{
                    delay: 0.45 + index * 0.05,
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: 0.5, originY: 1 }}
                />
              </g>
            ))}

            {/* Lớp cánh trong (6 cánh ôm sát tâm nụ hoa) */}
            {innerAngles.map((angle, index) => (
              <g key={`inner-${angle}`} transform={`rotate(${angle})`}>
                <motion.path
                  d="M 0,0 C -18,-12 -26,-32 -14,-48 C -6,-58 6,-58 14,-48 C 26,-32 18,-12 0,0 Z"
                  fill="url(#petalGradInner)"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="0.6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isBlooming ? 1 : 0,
                    opacity: isBlooming ? 1 : 0,
                  }}
                  transition={{
                    delay: 0.8 + index * 0.05,
                    duration: 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: 0.5, originY: 1 }}
                />
              </g>
            ))}

            {/* Vầng hào quang nhụy hoa phát sáng ấm áp */}
            <motion.circle
              cx="0"
              cy="0"
              r="34"
              fill="url(#stamenAura)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isBlooming ? [0.8, 1.1, 1] : 0,
                opacity: isBlooming ? [0, 1, 0.9] : 0,
              }}
              transition={{ delay: 1.1, duration: 1.3, ease: "easeOut" }}
            />

            {/* Đĩa nhụy hoa vàng ấm ở tâm */}
            <motion.circle
              cx="0"
              cy="0"
              r="17"
              fill="#ffd166"
              stroke="#ffb703"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isBlooming ? 1 : 0, opacity: isBlooming ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 1.0, ease: "easeOut" }}
            />

            {/* Hạt nhụy trung tâm */}
            <motion.circle
              cx="0"
              cy="0"
              r="9.5"
              fill="#fff3b0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isBlooming ? 1 : 0, opacity: isBlooming ? 1 : 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            />

            {/* Các hạt phấn nhụy hoa tỏa đều xung quanh */}
            {stamenPoints.map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * 13;
              const y = Math.sin(rad) * 13;
              return (
                <motion.circle
                  key={`stamen-${deg}`}
                  cx={x}
                  cy={y}
                  r="1.8"
                  fill="#ffffff"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isBlooming ? 1 : 0, opacity: isBlooming ? 0.95 : 0 }}
                  transition={{ delay: 1.35 + i * 0.02, duration: 0.6 }}
                />
              );
            })}

            {/* Trái tim / ánh lấp lánh ở chính giữa */}
            <motion.circle
              cx="0"
              cy="0"
              r="4.5"
              fill="#ffffff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isBlooming ? [0.8, 1.3, 1] : 0,
                opacity: isBlooming ? [0.6, 1, 0.85] : 0,
              }}
              transition={{
                delay: 1.5,
                duration: 2.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}
