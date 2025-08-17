const LandingFooter = () => {
  return (
    <footer className="h-20 bg-gray-200 flex items-center justify-center p-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {process.env.APP_NAME}.
      </p>
    </footer>
  )
}

export default LandingFooter
